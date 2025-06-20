# Nix

Nix is a cli tool that is similar to homebrew but allows us to install all our dependencies (git, kubectl, ...) only for our mono-repo instead of installing all of them globally on your mac (using brew) such that each developer may have different versions or different setups.

it's a way for us to install anything we need outside of nodejs ecosystem (npm) just for our mono-repo.

## devbox

Nix is hardcore to use directly so devbox is a easier human friendly framework on top of it. We will use it.

### Install Nix + devbox

1. Install nix: `curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install --determinate` (will ask for a password)
2. run: `mkdir ~/.config/nix`
3. create github classic token with `read:packages` access and make it not-expired!!!
   - go here: https://github.com/settings/tokens
   - create a classic token
   - name it: nix-papaya
   - make it not-expired
   - give it: `read:packages`
   - copy the token you created to the clipboard
4. edit/create a file: `~/.config/nix/nix.conf` and add the following content:

```
experimental-features = nix-command flakes
access-tokens = github.com=<your-github-token>
```

6. Start a new shell in the papaya-mono directory
7. install devbox (it's like homebrew for specific git repo): `noglob nix profile install nixpkgs#devbox`
8. install direnv (activate devbox when you are in our repo): `noglob nix profile install nixpkgs#direnv`
9. Add `trusted-users = root <your mac username>` to `/etc/nix/nix.conf` (with sudo)
10. Run `sudo launchctl kickstart -k system/org.nixos.nix-daemon`
11. Start a new shell (outside of the IDE!!!) in papaya-mono directory and run `devbox shell`. It will take a while!! 10m-2h (depends on your mac and network).
    - this step blocks the git-hooks until it's done.
    - until this is done, do you commits like this from the terminal: LEFTHOOK=0 git commit -am "<your-message>"
12. Start a new shell in the papaya-mono directory and run `direnv allow`.
13. run `echo -e "\neval \"\$(direnv hook zsh)\"\n" >> ~/.zshrc` to the bottom of your
    - if you have fish shell (if you don't know what it is - skip it) - same: https://direnv.net/docs/hook.html#fish
14. Start a new shell in the papaya-mono directory. You should see a message that you are inside a devbox shell and you can access all our packages.
15. `mkdir -p ~/.config/direnv` and then create a file `~/.config/direnv/direnv.toml` with the content:

```toml
[global]
hide_env_diff = true
warn_timeout = "20s"

[whitelist]
exact = [ "<fill the absolute path to the papaya repository>/.envrc" ]
```

- If you work with git-workspaces. easier - you will be asked to run `direnv allow` on each them them when needed.

16. run `which git` inside our repo and out side. you should see different results! :)
17. You are done! Install your first package!

### Installing a package with a specific version (Try to use "latest" when you can to avoid security issues):

1. uninstall the package if it already exists (see above section)
2. go to https://www.nixhub.io
3. find the package you want + the version you want
4. run the command: `devbox add <package>@<version>`

### Uninstalling a package with a specific version:

1. `devbox rm <package>`

---

### Remove Nix

1. run: `/nix/nix-installer uninstall`.
