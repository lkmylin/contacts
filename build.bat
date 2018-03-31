@echo off

call gulp coffee-lint

call gulp coffee

call gulp bundle

call gulp minify