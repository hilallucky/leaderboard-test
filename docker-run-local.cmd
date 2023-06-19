:: v4
:: This batch file purpose is to easily build and run the project locally
:: Note: Intentionally to have the echo on so we can see what is the command/value being executed

@SETLOCAL ENABLEDELAYEDEXPANSION ENABLEEXTENSIONS
@ECHO ON

:: ====================
:: Config variables to be used at the commands below
:: ====================
:: SET PORT=4000

:: ====================
:: Build and run docker
:: ====================
:: Use current directory as tag based on current directory
for %%I in (.) do SET DOCKER_TAG=%%~nxI

CALL docker build -t %DOCKER_TAG% . && docker run^
  -p%PORT%:%PORT%^
  --name %DOCKER_TAG%^
  --rm -it %DOCKER_TAG%