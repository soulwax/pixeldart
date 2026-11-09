$ErrorActionPreference = 'Stop'

$example = $PSScriptRoot
$package = (Resolve-Path (Join-Path $example '..\..')).Path
$javascript = Join-Path $example 'build\procession.js'
$project = Join-Path $example 'desktop\Procession.csproj'
$publish = Join-Path $example 'desktop\publish'
$executable = Join-Path $example 'build\Procession.exe'

Push-Location $package
try {
    dart compile js -O2 --no-source-maps -o $javascript (Join-Path $example 'src\main.dart')
    if ($LASTEXITCODE -ne 0) { throw 'Dart compilation failed.' }

    dotnet publish $project -c Release -o $publish
    if ($LASTEXITCODE -ne 0) { throw 'Windows publish failed.' }

    Copy-Item -LiteralPath (Join-Path $publish 'Procession.exe') -Destination $executable -Force
    Write-Output "Built $executable"
}
finally {
    Pop-Location
}
