{ pkgs ? import <nixpkgs> {} }: {
  deps = [
    pkgs.nodejs-14_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.webpack
    pkgs.nodePackages.webpack-cli
    pkgs.nodePackages.ts-loader
    pkgs.nodePackages.copyfiles
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}