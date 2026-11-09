using System.Reflection;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace PixeldartDesktop;

internal static class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        try
        {
            var assembly = Assembly.GetExecutingAssembly();
            var appName = assembly.GetName().Name
                ?? throw new InvalidDataException("The game executable has no name.");
            var title = assembly.GetCustomAttribute<AssemblyTitleAttribute>()?.Title ?? appName;
            var gameDirectory = ExtractGame(assembly, appName);
            if (args.Contains("--self-test", StringComparer.Ordinal))
            {
                var runtime = CoreWebView2Environment.GetAvailableBrowserVersionString();
                Console.WriteLine($"Game assets: {gameDirectory}");
                Console.WriteLine($"WebView2 Runtime: {runtime}");
                return;
            }

            ApplicationConfiguration.Initialize();
            Application.Run(new GameWindow(gameDirectory, appName, title,
                args.Contains("--autostart", StringComparer.Ordinal)));
        }
        catch (Exception error)
        {
            if (args.Contains("--self-test", StringComparer.Ordinal))
            {
                Console.Error.WriteLine(error);
                Environment.ExitCode = 1;
                return;
            }
            MessageBox.Show(error.Message, "Game could not start", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private static string ExtractGame(Assembly assembly, string appName)
    {
        var version = assembly.ManifestModule.ModuleVersionId.ToString("N");
        var root = Path.GetFullPath(Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Pixeldart", appName, "Game", version));
        Directory.CreateDirectory(root);

        using var mutex = new Mutex(false, @"Local\PixeldartGameAssets-" + version);
        try { mutex.WaitOne(); }
        catch (AbandonedMutexException) { /* The abandoned lock is now ours. */ }
        try
        {
            var marker = Path.Combine(root, ".complete");
            if (!File.Exists(marker))
            {
                ExtractResources(assembly, root);
                File.WriteAllText(marker, version);
            }
        }
        finally { mutex.ReleaseMutex(); }

        if (!File.Exists(Path.Combine(root, "index.html")) ||
            !Directory.EnumerateFiles(Path.Combine(root, "build"), "*.js").Any())
            throw new InvalidDataException("The game executable is missing bundled assets.");
        return root;
    }

    private static void ExtractResources(Assembly assembly, string root)
    {
        foreach (var name in assembly.GetManifestResourceNames().Where(n => n.StartsWith("game/", StringComparison.Ordinal)))
        {
            var relative = name[5..].Replace('\\', '/');
            var destination = Path.GetFullPath(Path.Combine(root, relative.Replace('/', Path.DirectorySeparatorChar)));
            if (!destination.StartsWith(root + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase))
                throw new InvalidDataException($"Invalid bundled asset path: {name}");
            Directory.CreateDirectory(Path.GetDirectoryName(destination)!);
            using var source = assembly.GetManifestResourceStream(name)
                ?? throw new InvalidDataException($"Missing bundled asset: {name}");
            using var target = File.Create(destination);
            source.CopyTo(target);
        }
    }
}

internal sealed class GameWindow : Form
{
    private readonly string _gameDirectory;
    private readonly string _appName;
    private readonly string _title;
    private readonly bool _autostart;
    private readonly WebView2 _view = new() { Dock = DockStyle.Fill };

    public GameWindow(string gameDirectory, string appName, string title, bool autostart)
    {
        _gameDirectory = gameDirectory;
        _appName = appName;
        _title = title;
        _autostart = autostart;
        Text = title;
        ClientSize = new Size(1280, 720);
        MinimumSize = new Size(640, 400);
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(5, 5, 12);
        Controls.Add(_view);
        Shown += OnShown;
    }

    private async void OnShown(object? sender, EventArgs args)
    {
        try
        {
            var profile = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Pixeldart", _appName, "WebView2");
            var environment = await CoreWebView2Environment.CreateAsync(userDataFolder: profile);
            await _view.EnsureCoreWebView2Async(environment);
            _view.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "game.pixeldart.local", _gameDirectory,
                CoreWebView2HostResourceAccessKind.DenyCors);
            _view.CoreWebView2.NavigationCompleted += (_, result) =>
            {
                if (!result.IsSuccess)
                    MessageBox.Show($"The game page failed to load: {result.WebErrorStatus}",
                        _title, MessageBoxButtons.OK, MessageBoxIcon.Error);
            };
            _view.Source = new Uri("https://game.pixeldart.local/index.html" +
                (_autostart ? "?autostart" : ""));
            _view.Focus();
        }
        catch (Exception error)
        {
            MessageBox.Show(error.Message, $"{_title} could not start", MessageBoxButtons.OK, MessageBoxIcon.Error);
            Close();
        }
    }
}
