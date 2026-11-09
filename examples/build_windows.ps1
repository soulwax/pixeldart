param(
    [ValidateSet('all', '1', '2', '3', '4')]
    [string]$Example = 'all'
)

$ErrorActionPreference = 'Stop'
$examples = $PSScriptRoot
$package = (Resolve-Path (Join-Path $examples '..')).Path
$games = @{
    '1' = @{ Folder = 'example_1'; Name = 'PixelRocket'; Script = 'pixelrocket.js' }
    '2' = @{ Folder = 'example_2'; Name = 'Lantern'; Script = 'lantern.js' }
    '3' = @{ Folder = 'example_3'; Name = 'Tidewatch'; Script = 'tidewatch.js' }
}
$selected = if ($Example -eq 'all') { @('1', '2', '3', '4') } else { @($Example) }

Push-Location $package
try {
    foreach ($number in $selected) {
        if ($number -eq '4') {
            & (Join-Path $examples 'example_4\build_windows.ps1')
            continue
        }

        $game = $games[$number]
        $folder = Join-Path $examples $game.Folder
        $script = Join-Path $folder ('build\' + $game.Script)
        $project = Join-Path $folder ('desktop\' + $game.Name + '.csproj')
        $publish = Join-Path $folder 'desktop\publish'
        $exe = Join-Path $folder ('build\' + $game.Name + '.exe')

        dart compile js -O2 --no-source-maps -o $script (Join-Path $folder 'src\main.dart')
        if ($LASTEXITCODE -ne 0) { throw "Dart compilation failed for $($game.Name)." }

        dotnet publish $project -c Release -o $publish
        if ($LASTEXITCODE -ne 0) { throw "Windows publish failed for $($game.Name)." }

        Copy-Item -LiteralPath (Join-Path $publish ($game.Name + '.exe')) -Destination $exe -Force
        $check = Start-Process -FilePath $exe -ArgumentList '--self-test' -Wait -PassThru -WindowStyle Hidden
        if ($check.ExitCode -ne 0) { throw "Executable self-check failed for $($game.Name)." }
        Write-Output "Built $exe"
    }
}
finally {
    Pop-Location
}
