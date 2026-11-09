using System.Reflection;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace Procession;

internal static class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        try
        {
            var gameDirectory = ExtractGame();
            if (args.Contains("--self-test", StringComparer.Ordinal))
            {
                var runtime = CoreWebView2Environment.GetAvailableBrowserVersionString();
                Console.WriteLine($"Game assets: {gameDirectory}");
                Console.WriteLine($"WebView2 Runtime: {runtime}");
                return;
            }

            ApplicationConfiguration.Initialize();
            Application.Run(new GameWindow(gameDirectory,
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
            MessageBox.Show(error.Message, "Procession could not start", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private static string ExtractGame()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var version = assembly.ManifestModule.ModuleVersionId.ToString("N");
        var root = Path.GetFullPath(Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Procession", "Game", version));
        Directory.CreateDirectory(root);

        using var mutex = new Mutex(false, @"Local\ProcessionGameAssets-" + version);
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
            !File.Exists(Path.Combine(root, "build", "procession.js")) ||
            !File.Exists(Path.Combine(root, "res", "town.png")))
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
    private readonly bool _autostart;
    private readonly WebView2 _view = new() { Dock = DockStyle.Fill };

    public GameWindow(string gameDirectory, bool autostart)
    {
        _gameDirectory = gameDirectory;
        _autostart = autostart;
        Text = "Procession";
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
            await _view.EnsureCoreWebView2Async();
            _view.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "procession.local", _gameDirectory,
                CoreWebView2HostResourceAccessKind.DenyCors);
            _view.CoreWebView2.NavigationCompleted += (_, result) =>
            {
                if (!result.IsSuccess)
                    MessageBox.Show($"The game page failed to load: {result.WebErrorStatus}",
                        "Procession", MessageBoxButtons.OK, MessageBoxIcon.Error);
            };
            _view.Source = new Uri("https://procession.local/index.html" +
                (_autostart ? "?autostart" : ""));
            _view.Focus();
        }
        catch (Exception error)
        {
            MessageBox.Show(error.Message, "Procession could not start", MessageBoxButtons.OK, MessageBoxIcon.Error);
            Close();
        }
    }
}
