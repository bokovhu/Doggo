# Assembling the development environment

This document describes how to assemble the development environment for this project on _Linux_.

:::warning
The document was copied over from another project, that uses the same development environment. Nevertheless, the exact same toolset is used here, so we've included it as-is.
:::

:::info
To be able to separate different environments on the WSL host, we first create a _fresh Ubuntu WSL instance from the latest official daily built rootfs archive_. This way, we can _import it_ with a different name, and use it for _Deploy Cash development_. We will setup the _named imported instance_ to be used for _Deploy Cash development_.

These daily builds can be found [here](https://cloud-images.ubuntu.com/wsl). We are using the following `.tar.gz` file for this documentation:

```
https://cloud-images.ubuntu.com/wsl/jammy/20240117/ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz
```
:::

* In a _Command Prompt_ (`cmd.exe`), we run the following commands:

```
C:\work\hobby\aleph-hack>dir
 Volume in drive C has no label.
 Volume Serial Number is C65C-FC6D

 Directory of C:\work\hobby\aleph-hack

2024. 01. 18.  21:19    <DIR>          .
2024. 01. 08.  12:39    <DIR>          ..
2024. 01. 18.  21:09                38 .gitignore
2024. 01. 10.  15:31    <DIR>          node_modules
2024. 01. 10.  15:31           157 009 package-lock.json
2024. 01. 10.  15:08             1 558 package.json
2024. 01. 18.  20:28    <DIR>          packages
2024. 01. 17.  00:55               804 README.md
2024. 01. 17.  01:53    <DIR>          test
2024. 01. 18.  21:17       566 203 734 ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz
               5 File(s)    566 363 143 bytes
               5 Dir(s)  180 248 633 344 bytes free

C:\work\hobby\aleph-hack>mkdir wsl-distros

C:\work\hobby\aleph-hack>mkdir wsl-distros\DeployCashDev

C:\work\hobby\aleph-hack>wsl --import DeployCashDev C:\work\hobby\aleph-hack\wsl-distros\DeployCashDev .\ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz 

C:\work\hobby\aleph-hack>wsl -d DeployCashDev 
Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.10.102.1-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

This message is shown once a day. To disable it please create the
/root/.hushlogin file.
root@tthe-pc:/mnt/c/work/hobby/aleph-hack#
```
:::::

:::::details Now, we install [`nvm`](https://github.com/nvm-sh/nvm) and Node.JS 20
* We run the following commands:

```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# apt-get update
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]    
Get:3 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Get:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [109 kB]
Get:5 http://archive.ubuntu.com/ubuntu jammy/universe amd64 Packages [14.1 MB]
Get:6 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [1065 kB]
Get:7 http://archive.ubuntu.com/ubuntu jammy/universe Translation-en [5652 kB]
Get:8 http://archive.ubuntu.com/ubuntu jammy/universe amd64 c-n-f Metadata [286 kB]
Get:9 http://archive.ubuntu.com/ubuntu jammy/multiverse amd64 Packages [217 kB]
Get:10 http://archive.ubuntu.com/ubuntu jammy/multiverse Translation-en [112 kB]
Get:11 http://archive.ubuntu.com/ubuntu jammy/multiverse amd64 c-n-f Metadata [8372 B]
Get:12 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [1280 kB]
Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/main Translation-en [262 kB]
Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1031 kB]
Get:15 http://security.ubuntu.com/ubuntu jammy-security/universe amd64 Packages [831 kB]
Get:16 http://archive.ubuntu.com/ubuntu jammy-updates/universe Translation-en [230 kB]
Get:17 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 c-n-f Metadata [22.1 kB]
Get:18 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 Packages [42.1 kB]
Get:19 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse Translation-en [10.1 kB]
Get:20 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 c-n-f Metadata [472 B]
Get:21 http://archive.ubuntu.com/ubuntu jammy-backports/main amd64 Packages [64.7 kB]
Get:22 http://archive.ubuntu.com/ubuntu jammy-backports/main Translation-en [10.5 kB]
Get:23 http://archive.ubuntu.com/ubuntu jammy-backports/main amd64 c-n-f Metadata [388 B]
Get:24 http://archive.ubuntu.com/ubuntu jammy-backports/restricted amd64 c-n-f Metadata [116 B]
Get:25 http://security.ubuntu.com/ubuntu jammy-security/universe Translation-en [158 kB]
Get:26 http://security.ubuntu.com/ubuntu jammy-security/universe amd64 c-n-f Metadata [16.8 kB]
Get:27 http://security.ubuntu.com/ubuntu jammy-security/multiverse amd64 Packages [37.1 kB]
Get:28 http://security.ubuntu.com/ubuntu jammy-security/multiverse Translation-en [7476 B]
Get:29 http://security.ubuntu.com/ubuntu jammy-security/multiverse amd64 c-n-f Metadata [260 B]
Get:30 http://archive.ubuntu.com/ubuntu jammy-backports/universe amd64 Packages [27.8 kB]
Get:31 http://archive.ubuntu.com/ubuntu jammy-backports/universe Translation-en [16.5 kB]
Get:32 http://archive.ubuntu.com/ubuntu jammy-backports/universe amd64 c-n-f Metadata [644 B]
Get:33 http://archive.ubuntu.com/ubuntu jammy-backports/multiverse amd64 c-n-f Metadata [116 B]
Fetched 25.8 MB in 2s (11.4 MB/s) 
Reading package lists... Done
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# apt-get upgrade
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# apt-get -y install curl nano
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
nano is already the newest version (6.2-1).
nano set to manually installed.
curl is already the newest version (7.81.0-1ubuntu1.15).
curl set to manually installed.
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 16555  100 16555    0     0  81997      0 --:--:-- --:--:-- --:--:-- 82363
=> Downloading nvm from git to '/root/.nvm'
=> Cloning into '/root/.nvm'...
remote: Enumerating objects: 365, done.
remote: Counting objects: 100% (365/365), done.
remote: Compressing objects: 100% (314/314), done.
remote: Total 365 (delta 43), reused 162 (delta 25), pack-reused 0
Receiving objects: 100% (365/365), 364.78 KiB | 5.14 MiB/s, done.
Resolving deltas: 100% (43/43), done.
* (HEAD detached at FETCH_HEAD)
  master
=> Compressing and cleaning up git repository

=> Appending nvm source string to /root/.bashrc
=> Appending bash_completion source string to /root/.bashrc
=> You currently have modules installed globally with `npm`. These will no
=> longer be linked to the active version of Node when you install a new node
=> with `nvm`; and they may (depending on how you construct your `$PATH`)
=> override the binaries of modules installed with `nvm`:

C:\Users\boton\AppData\Roaming\npm
├── @redocly/cli@1.0.0-rc.3
├── @vscode/vsce@2.19.0
├── caz@1.1.0
├── generator-code@1.7.5
├── gulp-cli@2.3.0
├── pajv@1.2.0
├── surge@0.23.1
├── typescript@5.1.6
├── yaml-schema-validator@1.2.3
├── yaml-validator@4.0.0
├── yarn@1.22.19
└── yo@4.3.1
=> If you wish to uninstall them at a later point (or re-install them under your
=> `nvm` Nodes), you can remove them from the system Node as follows:

     $ nvm use system
     $ npm uninstall -g a_module

=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# export NVM_DIR="$HOME/.nvm"
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# nvm install 20
Downloading and installing node v20.11.0...
Downloading https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz...
######################################################################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v20.11.0 (npm v10.2.4)
Creating default alias: default -> 20 (-> v20.11.0)
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# node --version
v20.11.0
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# npm --version
10.2.4
root@tthe-pc:/mnt/c/work/hobby/aleph-hack#
:::::

:::::details Now, we install a C/C++ compiler
* I will be using Clang, but GCC is also fine. We run the following commands:

```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# apt-get -y install clang
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  binfmt-support clang-14 fontconfig-config fonts-dejavu-core gcc-11-base icu-devtools lib32gcc-s1 lib32stdc++6 libasan6       
  libatomic1 libc-dev-bin libc-devtools libc6-dev libc6-i386 libclang-common-14-dev libclang-cpp14 libclang1-14 libcrypt-dev   
  libdeflate0 libffi-dev libfontconfig1 libfreetype6 libgc1 libgcc-11-dev libgd3 libgomp1 libicu-dev libitm1 libjbig0
  libjpeg-turbo8 libjpeg8 libllvm14 liblsan0 libncurses-dev libnsl-dev libobjc-11-dev libobjc4 libpfm4 libquadmath0
  libstdc++-11-dev libtiff5 libtinfo-dev libtirpc-dev libtsan0 libubsan1 libwebp7 libxml2-dev libxpm4 libz3-4 libz3-dev        
  linux-libc-dev llvm-14 llvm-14-dev llvm-14-linker-tools llvm-14-runtime llvm-14-tools manpages-dev python3-pygments
  rpcsvc-proto
Suggested packages:
  clang-14-doc glibc-doc libgd-tools icu-doc ncurses-doc libstdc++-11-doc pkg-config llvm-14-doc python-pygments-doc
  ttf-bitstream-vera
The following NEW packages will be installed:
  binfmt-support clang clang-14 fontconfig-config fonts-dejavu-core gcc-11-base icu-devtools lib32gcc-s1 lib32stdc++6
  libasan6 libatomic1 libc-dev-bin libc-devtools libc6-dev libc6-i386 libclang-common-14-dev libclang-cpp14 libclang1-14       
  libcrypt-dev libdeflate0 libffi-dev libfontconfig1 libfreetype6 libgc1 libgcc-11-dev libgd3 libgomp1 libicu-dev libitm1      
  libjbig0 libjpeg-turbo8 libjpeg8 libllvm14 liblsan0 libncurses-dev libnsl-dev libobjc-11-dev libobjc4 libpfm4 libquadmath0   
  libstdc++-11-dev libtiff5 libtinfo-dev libtirpc-dev libtsan0 libubsan1 libwebp7 libxml2-dev libxpm4 libz3-4 libz3-dev        
  linux-libc-dev llvm-14 llvm-14-dev llvm-14-linker-tools llvm-14-runtime llvm-14-tools manpages-dev python3-pygments
  rpcsvc-proto
0 upgraded, 60 newly installed, 0 to remove and 0 not upgraded.
Need to get 146 MB of archives.
After this operation, 794 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 binfmt-support amd64 2.2.1-2 [55.8 kB]
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libllvm14 amd64 1:14.0.0-1ubuntu1.1 [24.0 MB]
Get:3 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libclang-cpp14 amd64 1:14.0.0-1ubuntu1.1 [12.1 MB]
Get:4 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gcc-11-base amd64 11.4.0-1ubuntu1~22.04 [20.2 kB]
Get:5 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgomp1 amd64 12.3.0-1ubuntu1~22.04 [126 kB]
Get:6 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libitm1 amd64 12.3.0-1ubuntu1~22.04 [30.2 kB]
Get:7 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libatomic1 amd64 12.3.0-1ubuntu1~22.04 [10.4 kB]
Get:8 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libasan6 amd64 11.4.0-1ubuntu1~22.04 [2282 kB]
Get:9 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 liblsan0 amd64 12.3.0-1ubuntu1~22.04 [1069 kB]
Get:10 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtsan0 amd64 11.4.0-1ubuntu1~22.04 [2260 kB]
Get:11 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libubsan1 amd64 12.3.0-1ubuntu1~22.04 [976 kB]
Get:12 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libquadmath0 amd64 12.3.0-1ubuntu1~22.04 [154 kB]
Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgcc-11-dev amd64 11.4.0-1ubuntu1~22.04 [2517 kB]
Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc-dev-bin amd64 2.35-0ubuntu3.6 [20.3 kB]
Get:15 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 linux-libc-dev amd64 5.15.0-91.101 [1332 kB]
Get:16 http://archive.ubuntu.com/ubuntu jammy/main amd64 libcrypt-dev amd64 1:4.4.27-1 [112 kB]
Get:17 http://archive.ubuntu.com/ubuntu jammy/main amd64 rpcsvc-proto amd64 1.4.2-0ubuntu6 [68.5 kB]
Get:18 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtirpc-dev amd64 1.3.2-2ubuntu0.1 [192 kB]
Get:19 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnsl-dev amd64 1.3.0-2build2 [71.3 kB]
Get:20 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc6-dev amd64 2.35-0ubuntu3.6 [2100 kB]
Get:21 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libstdc++-11-dev amd64 11.4.0-1ubuntu1~22.04 [2101 kB]
Get:22 http://archive.ubuntu.com/ubuntu jammy/main amd64 libgc1 amd64 1:8.0.6-1.1build1 [96.8 kB]
Get:23 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libobjc4 amd64 12.3.0-1ubuntu1~22.04 [48.6 kB]
Get:24 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libobjc-11-dev amd64 11.4.0-1ubuntu1~22.04 [196 kB]       
Get:25 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc6-i386 amd64 2.35-0ubuntu3.6 [2837 kB]
Get:26 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 lib32gcc-s1 amd64 12.3.0-1ubuntu1~22.04 [63.9 kB]
Get:27 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 lib32stdc++6 amd64 12.3.0-1ubuntu1~22.04 [740 kB]
Get:28 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libclang-common-14-dev amd64 1:14.0.0-1ubuntu1.1 [5975 kB]
Get:29 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 llvm-14-linker-tools amd64 1:14.0.0-1ubuntu1.1 [1355 kB]
Get:30 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libclang1-14 amd64 1:14.0.0-1ubuntu1.1 [6792 kB]
Get:31 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 clang-14 amd64 1:14.0.0-1ubuntu1.1 [81.2 kB]
Get:32 http://archive.ubuntu.com/ubuntu jammy/universe amd64 clang amd64 1:14.0-55~exp2 [3558 B]
Get:33 http://archive.ubuntu.com/ubuntu jammy/main amd64 fonts-dejavu-core all 2.37-2build1 [1041 kB]
Get:34 http://archive.ubuntu.com/ubuntu jammy/main amd64 fontconfig-config all 2.13.1-4.2ubuntu5 [29.1 kB]
Get:35 http://archive.ubuntu.com/ubuntu jammy/main amd64 icu-devtools amd64 70.1-2 [197 kB]
Get:36 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libfreetype6 amd64 2.11.1+dfsg-1ubuntu0.2 [389 kB]
Get:37 http://archive.ubuntu.com/ubuntu jammy/main amd64 libfontconfig1 amd64 2.13.1-4.2ubuntu5 [131 kB]
Get:38 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjpeg-turbo8 amd64 2.1.2-0ubuntu1 [134 kB]
Get:39 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjpeg8 amd64 8c-2ubuntu10 [2264 B]
Get:40 http://archive.ubuntu.com/ubuntu jammy/main amd64 libdeflate0 amd64 1.10-2 [70.9 kB]
Get:41 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libjbig0 amd64 2.1-3.1ubuntu0.22.04.1 [29.2 kB]
Get:42 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libwebp7 amd64 1.2.2-2ubuntu0.22.04.2 [206 kB]
Get:43 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtiff5 amd64 4.3.0-6ubuntu0.7 [185 kB]
Get:44 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libxpm4 amd64 1:3.5.12-1ubuntu0.22.04.2 [36.7 kB]
Get:45 http://archive.ubuntu.com/ubuntu jammy/main amd64 libgd3 amd64 2.3.0-2ubuntu2 [129 kB]
Get:46 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc-devtools amd64 2.35-0ubuntu3.6 [29.0 kB]
Get:47 http://archive.ubuntu.com/ubuntu jammy/main amd64 libicu-dev amd64 70.1-2 [11.6 MB]
Get:48 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libncurses-dev amd64 6.3-2ubuntu0.1 [381 kB]
Get:49 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtinfo-dev amd64 6.3-2ubuntu0.1 [780 B]
Get:50 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libxml2-dev amd64 2.9.13+dfsg-1ubuntu0.3 [804 kB]
Get:51 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 llvm-14-runtime amd64 1:14.0.0-1ubuntu1.1 [484 kB]
Get:52 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpfm4 amd64 4.11.1+git32-gd0b85fb-1ubuntu0.1 [345 kB]
Get:53 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 llvm-14 amd64 1:14.0.0-1ubuntu1.1 [12.7 MB]
Get:54 http://archive.ubuntu.com/ubuntu jammy/main amd64 libffi-dev amd64 3.4.2-4 [63.7 kB]
Get:55 http://archive.ubuntu.com/ubuntu jammy/main amd64 python3-pygments all 2.11.2+dfsg-2 [750 kB]
Get:56 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 llvm-14-tools amd64 1:14.0.0-1ubuntu1.1 [404 kB]
Get:57 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libz3-4 amd64 4.8.12-1 [5766 kB]
Get:58 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libz3-dev amd64 4.8.12-1 [72.2 kB]
Get:59 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 llvm-14-dev amd64 1:14.0.0-1ubuntu1.1 [37.8 MB]
Get:60 http://archive.ubuntu.com/ubuntu jammy/main amd64 manpages-dev all 5.10-1ubuntu1 [2309 kB]
Fetched 146 MB in 8s (19.4 MB/s)                                                                                               
Extracting templates from packages: 100%
Selecting previously unselected package binfmt-support.
(Reading database ... 24210 files and directories currently installed.)
Preparing to unpack .../00-binfmt-support_2.2.1-2_amd64.deb ...
Unpacking binfmt-support (2.2.1-2) ...
Selecting previously unselected package libllvm14:amd64.
Preparing to unpack .../01-libllvm14_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking libllvm14:amd64 (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package libclang-cpp14.
Preparing to unpack .../02-libclang-cpp14_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking libclang-cpp14 (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package gcc-11-base:amd64.
Preparing to unpack .../03-gcc-11-base_11.4.0-1ubuntu1~22.04_amd64.deb ...
Unpacking gcc-11-base:amd64 (11.4.0-1ubuntu1~22.04) ...
Selecting previously unselected package libgomp1:amd64.
Preparing to unpack .../04-libgomp1_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libgomp1:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libitm1:amd64.
Preparing to unpack .../05-libitm1_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libitm1:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libatomic1:amd64.
Preparing to unpack .../06-libatomic1_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libatomic1:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libasan6:amd64.
Preparing to unpack .../07-libasan6_11.4.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libasan6:amd64 (11.4.0-1ubuntu1~22.04) ...
Selecting previously unselected package liblsan0:amd64.
Preparing to unpack .../08-liblsan0_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking liblsan0:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libtsan0:amd64.
Preparing to unpack .../09-libtsan0_11.4.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libtsan0:amd64 (11.4.0-1ubuntu1~22.04) ...
Selecting previously unselected package libubsan1:amd64.
Preparing to unpack .../10-libubsan1_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libubsan1:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libquadmath0:amd64.
Preparing to unpack .../11-libquadmath0_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libquadmath0:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libgcc-11-dev:amd64.
Preparing to unpack .../12-libgcc-11-dev_11.4.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libgcc-11-dev:amd64 (11.4.0-1ubuntu1~22.04) ...
Selecting previously unselected package libc-dev-bin.
Preparing to unpack .../13-libc-dev-bin_2.35-0ubuntu3.6_amd64.deb ...
Unpacking libc-dev-bin (2.35-0ubuntu3.6) ...
Selecting previously unselected package linux-libc-dev:amd64.
Preparing to unpack .../14-linux-libc-dev_5.15.0-91.101_amd64.deb ...
Unpacking linux-libc-dev:amd64 (5.15.0-91.101) ...
Selecting previously unselected package libcrypt-dev:amd64.
Preparing to unpack .../15-libcrypt-dev_1%3a4.4.27-1_amd64.deb ...
Unpacking libcrypt-dev:amd64 (1:4.4.27-1) ...
Selecting previously unselected package rpcsvc-proto.
Preparing to unpack .../16-rpcsvc-proto_1.4.2-0ubuntu6_amd64.deb ...
Unpacking rpcsvc-proto (1.4.2-0ubuntu6) ...
Selecting previously unselected package libtirpc-dev:amd64.
Preparing to unpack .../17-libtirpc-dev_1.3.2-2ubuntu0.1_amd64.deb ...
Unpacking libtirpc-dev:amd64 (1.3.2-2ubuntu0.1) ...
Selecting previously unselected package libnsl-dev:amd64.
Preparing to unpack .../18-libnsl-dev_1.3.0-2build2_amd64.deb ...
Unpacking libnsl-dev:amd64 (1.3.0-2build2) ...
Selecting previously unselected package libc6-dev:amd64.
Preparing to unpack .../19-libc6-dev_2.35-0ubuntu3.6_amd64.deb ...
Unpacking libc6-dev:amd64 (2.35-0ubuntu3.6) ...
Selecting previously unselected package libstdc++-11-dev:amd64.
Preparing to unpack .../20-libstdc++-11-dev_11.4.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libstdc++-11-dev:amd64 (11.4.0-1ubuntu1~22.04) ...
Selecting previously unselected package libgc1:amd64.
Preparing to unpack .../21-libgc1_1%3a8.0.6-1.1build1_amd64.deb ...
Unpacking libgc1:amd64 (1:8.0.6-1.1build1) ...
Selecting previously unselected package libobjc4:amd64.
Preparing to unpack .../22-libobjc4_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libobjc4:amd64 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libobjc-11-dev:amd64.
Preparing to unpack .../23-libobjc-11-dev_11.4.0-1ubuntu1~22.04_amd64.deb ...
Unpacking libobjc-11-dev:amd64 (11.4.0-1ubuntu1~22.04) ...
Selecting previously unselected package libc6-i386.
Preparing to unpack .../24-libc6-i386_2.35-0ubuntu3.6_amd64.deb ...
Unpacking libc6-i386 (2.35-0ubuntu3.6) ...
Selecting previously unselected package lib32gcc-s1.
Preparing to unpack .../25-lib32gcc-s1_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking lib32gcc-s1 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package lib32stdc++6.
Preparing to unpack .../26-lib32stdc++6_12.3.0-1ubuntu1~22.04_amd64.deb ...
Unpacking lib32stdc++6 (12.3.0-1ubuntu1~22.04) ...
Selecting previously unselected package libclang-common-14-dev.
Preparing to unpack .../27-libclang-common-14-dev_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking libclang-common-14-dev (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package llvm-14-linker-tools.
Preparing to unpack .../28-llvm-14-linker-tools_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking llvm-14-linker-tools (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package libclang1-14.
Preparing to unpack .../29-libclang1-14_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking libclang1-14 (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package clang-14.
Preparing to unpack .../30-clang-14_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking clang-14 (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package clang.
Preparing to unpack .../31-clang_1%3a14.0-55~exp2_amd64.deb ...
Unpacking clang (1:14.0-55~exp2) ...
Selecting previously unselected package fonts-dejavu-core.
Preparing to unpack .../32-fonts-dejavu-core_2.37-2build1_all.deb ...
Unpacking fonts-dejavu-core (2.37-2build1) ...
Selecting previously unselected package fontconfig-config.
Preparing to unpack .../33-fontconfig-config_2.13.1-4.2ubuntu5_all.deb ...
Unpacking fontconfig-config (2.13.1-4.2ubuntu5) ...
Selecting previously unselected package icu-devtools.
Preparing to unpack .../34-icu-devtools_70.1-2_amd64.deb ...
Unpacking icu-devtools (70.1-2) ...
Selecting previously unselected package libfreetype6:amd64.
Preparing to unpack .../35-libfreetype6_2.11.1+dfsg-1ubuntu0.2_amd64.deb ...
Unpacking libfreetype6:amd64 (2.11.1+dfsg-1ubuntu0.2) ...
Selecting previously unselected package libfontconfig1:amd64.
Preparing to unpack .../36-libfontconfig1_2.13.1-4.2ubuntu5_amd64.deb ...
Unpacking libfontconfig1:amd64 (2.13.1-4.2ubuntu5) ...
Selecting previously unselected package libjpeg-turbo8:amd64.
Preparing to unpack .../37-libjpeg-turbo8_2.1.2-0ubuntu1_amd64.deb ...
Unpacking libjpeg-turbo8:amd64 (2.1.2-0ubuntu1) ...
Selecting previously unselected package libjpeg8:amd64.
Preparing to unpack .../38-libjpeg8_8c-2ubuntu10_amd64.deb ...
Unpacking libjpeg8:amd64 (8c-2ubuntu10) ...
Selecting previously unselected package libdeflate0:amd64.
Preparing to unpack .../39-libdeflate0_1.10-2_amd64.deb ...
Unpacking libdeflate0:amd64 (1.10-2) ...
Selecting previously unselected package libjbig0:amd64.
Preparing to unpack .../40-libjbig0_2.1-3.1ubuntu0.22.04.1_amd64.deb ...
Unpacking libjbig0:amd64 (2.1-3.1ubuntu0.22.04.1) ...
Selecting previously unselected package libwebp7:amd64.
Preparing to unpack .../41-libwebp7_1.2.2-2ubuntu0.22.04.2_amd64.deb ...
Unpacking libwebp7:amd64 (1.2.2-2ubuntu0.22.04.2) ...
Selecting previously unselected package libtiff5:amd64.
Preparing to unpack .../42-libtiff5_4.3.0-6ubuntu0.7_amd64.deb ...
Unpacking libtiff5:amd64 (4.3.0-6ubuntu0.7) ...
Selecting previously unselected package libxpm4:amd64.
Preparing to unpack .../43-libxpm4_1%3a3.5.12-1ubuntu0.22.04.2_amd64.deb ...
Unpacking libxpm4:amd64 (1:3.5.12-1ubuntu0.22.04.2) ...
Selecting previously unselected package libgd3:amd64.
Preparing to unpack .../44-libgd3_2.3.0-2ubuntu2_amd64.deb ...
Unpacking libgd3:amd64 (2.3.0-2ubuntu2) ...
Selecting previously unselected package libc-devtools.
Preparing to unpack .../45-libc-devtools_2.35-0ubuntu3.6_amd64.deb ...
Unpacking libc-devtools (2.35-0ubuntu3.6) ...
Selecting previously unselected package libicu-dev:amd64.
Preparing to unpack .../46-libicu-dev_70.1-2_amd64.deb ...
Unpacking libicu-dev:amd64 (70.1-2) ...
Selecting previously unselected package libncurses-dev:amd64.
Preparing to unpack .../47-libncurses-dev_6.3-2ubuntu0.1_amd64.deb ...
Unpacking libncurses-dev:amd64 (6.3-2ubuntu0.1) ...
Selecting previously unselected package libtinfo-dev:amd64.
Preparing to unpack .../48-libtinfo-dev_6.3-2ubuntu0.1_amd64.deb ...
Unpacking libtinfo-dev:amd64 (6.3-2ubuntu0.1) ...
Selecting previously unselected package libxml2-dev:amd64.
Preparing to unpack .../49-libxml2-dev_2.9.13+dfsg-1ubuntu0.3_amd64.deb ...
Unpacking libxml2-dev:amd64 (2.9.13+dfsg-1ubuntu0.3) ...
Selecting previously unselected package llvm-14-runtime.
Preparing to unpack .../50-llvm-14-runtime_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking llvm-14-runtime (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package libpfm4:amd64.
Preparing to unpack .../51-libpfm4_4.11.1+git32-gd0b85fb-1ubuntu0.1_amd64.deb ...
Unpacking libpfm4:amd64 (4.11.1+git32-gd0b85fb-1ubuntu0.1) ...
Selecting previously unselected package llvm-14.
Preparing to unpack .../52-llvm-14_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking llvm-14 (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package libffi-dev:amd64.
Preparing to unpack .../53-libffi-dev_3.4.2-4_amd64.deb ...
Unpacking libffi-dev:amd64 (3.4.2-4) ...
Selecting previously unselected package python3-pygments.
Preparing to unpack .../54-python3-pygments_2.11.2+dfsg-2_all.deb ...
Unpacking python3-pygments (2.11.2+dfsg-2) ...
Selecting previously unselected package llvm-14-tools.
Preparing to unpack .../55-llvm-14-tools_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking llvm-14-tools (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package libz3-4:amd64.
Preparing to unpack .../56-libz3-4_4.8.12-1_amd64.deb ...
Unpacking libz3-4:amd64 (4.8.12-1) ...
Selecting previously unselected package libz3-dev:amd64.
Preparing to unpack .../57-libz3-dev_4.8.12-1_amd64.deb ...
Unpacking libz3-dev:amd64 (4.8.12-1) ...
Selecting previously unselected package llvm-14-dev.
Preparing to unpack .../58-llvm-14-dev_1%3a14.0.0-1ubuntu1.1_amd64.deb ...
Unpacking llvm-14-dev (1:14.0.0-1ubuntu1.1) ...
Selecting previously unselected package manpages-dev.
Preparing to unpack .../59-manpages-dev_5.10-1ubuntu1_all.deb ...
Unpacking manpages-dev (5.10-1ubuntu1) ...
Setting up gcc-11-base:amd64 (11.4.0-1ubuntu1~22.04) ...
Setting up manpages-dev (5.10-1ubuntu1) ...
Setting up libxpm4:amd64 (1:3.5.12-1ubuntu0.22.04.2) ...
Setting up libdeflate0:amd64 (1.10-2) ...
Setting up linux-libc-dev:amd64 (5.15.0-91.101) ...
Setting up libgomp1:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up libffi-dev:amd64 (3.4.2-4) ...
Setting up libjbig0:amd64 (2.1-3.1ubuntu0.22.04.1) ...
Setting up libasan6:amd64 (11.4.0-1ubuntu1~22.04) ...
Setting up python3-pygments (2.11.2+dfsg-2) ...
Setting up libz3-4:amd64 (4.8.12-1) ...
Setting up libtirpc-dev:amd64 (1.3.2-2ubuntu0.1) ...
Setting up libpfm4:amd64 (4.11.1+git32-gd0b85fb-1ubuntu0.1) ...
Setting up rpcsvc-proto (1.4.2-0ubuntu6) ...
Setting up libfreetype6:amd64 (2.11.1+dfsg-1ubuntu0.2) ...
Setting up libquadmath0:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up libatomic1:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up binfmt-support (2.2.1-2) ...
invoke-rc.d: could not determine current runlevel
Created symlink /etc/systemd/system/multi-user.target.wants/binfmt-support.service → /lib/systemd/system/binfmt-support.service.
Setting up icu-devtools (70.1-2) ...
Setting up fonts-dejavu-core (2.37-2build1) ...
Setting up libjpeg-turbo8:amd64 (2.1.2-0ubuntu1) ...
Setting up libgc1:amd64 (1:8.0.6-1.1build1) ...
Setting up libwebp7:amd64 (1.2.2-2ubuntu0.22.04.2) ...
Setting up libubsan1:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up libllvm14:amd64 (1:14.0.0-1ubuntu1.1) ...
Setting up libnsl-dev:amd64 (1.3.0-2build2) ...
Setting up libcrypt-dev:amd64 (1:4.4.27-1) ...
Setting up libc6-i386 (2.35-0ubuntu3.6) ...
Setting up libc-dev-bin (2.35-0ubuntu3.6) ...
Setting up llvm-14-linker-tools (1:14.0.0-1ubuntu1.1) ...
Setting up liblsan0:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up libitm1:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up libtsan0:amd64 (11.4.0-1ubuntu1~22.04) ...
Setting up llvm-14-tools (1:14.0.0-1ubuntu1.1) ...
Setting up libjpeg8:amd64 (8c-2ubuntu10) ...
Setting up libz3-dev:amd64 (4.8.12-1) ...
Setting up fontconfig-config (2.13.1-4.2ubuntu5) ...
Setting up libclang1-14 (1:14.0.0-1ubuntu1.1) ...
Setting up libobjc4:amd64 (12.3.0-1ubuntu1~22.04) ...
Setting up llvm-14-runtime (1:14.0.0-1ubuntu1.1) ...
Setting up lib32gcc-s1 (12.3.0-1ubuntu1~22.04) ...
Setting up lib32stdc++6 (12.3.0-1ubuntu1~22.04) ...
Setting up libclang-common-14-dev (1:14.0.0-1ubuntu1.1) ...
Setting up libclang-cpp14 (1:14.0.0-1ubuntu1.1) ...
Setting up libgcc-11-dev:amd64 (11.4.0-1ubuntu1~22.04) ...
Setting up libc6-dev:amd64 (2.35-0ubuntu3.6) ...
Setting up libtiff5:amd64 (4.3.0-6ubuntu0.7) ...
Setting up libfontconfig1:amd64 (2.13.1-4.2ubuntu5) ...
Setting up libicu-dev:amd64 (70.1-2) ...
Setting up llvm-14 (1:14.0.0-1ubuntu1.1) ...
Setting up libncurses-dev:amd64 (6.3-2ubuntu0.1) ...
Setting up libobjc-11-dev:amd64 (11.4.0-1ubuntu1~22.04) ...
Setting up libxml2-dev:amd64 (2.9.13+dfsg-1ubuntu0.3) ...
Setting up libgd3:amd64 (2.3.0-2ubuntu2) ...
Setting up libstdc++-11-dev:amd64 (11.4.0-1ubuntu1~22.04) ...
Setting up llvm-14-dev (1:14.0.0-1ubuntu1.1) ...
Setting up libc-devtools (2.35-0ubuntu3.6) ...
Setting up libtinfo-dev:amd64 (6.3-2ubuntu0.1) ...
Setting up clang-14 (1:14.0.0-1ubuntu1.1) ...
Setting up clang (1:14.0-55~exp2) ...
Processing triggers for libc-bin (2.35-0ubuntu3.6) ...
/sbin/ldconfig.real: Can't link /usr/lib/wsl/lib/libnvoptix_loader.so.1 to libnvoptix.so.1
/sbin/ldconfig.real: /usr/lib/wsl/lib/libcuda.so.1 is not a symbolic link

Processing triggers for man-db (2.10.2-1) ...
Processing triggers for install-info (6.8-4build1) ...
root@tthe-pc:/mnt/c/work/hobby/aleph-hack#
```
:::::

:::::details Now, we install `make`
* We run the following commands:

```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack/substrate-node-template# apt-get -y install make
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  make-doc
The following NEW packages will be installed:
  make
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 180 kB of archives.
After this operation, 426 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 make amd64 4.3-4.1build1 [180 kB]
Fetched 180 kB in 1s (239 kB/s)
Selecting previously unselected package make.
(Reading database ... 34887 files and directories currently installed.)
Preparing to unpack .../make_4.3-4.1build1_amd64.deb ...
Unpacking make (4.3-4.1build1) ...
Setting up make (4.3-4.1build1) ...
Processing triggers for man-db (2.10.2-1) ...
root@tthe-pc:/mnt/c/work/hobby/aleph-hack/substrate-node-template#
```
:::::

:::::details Now, we install [Protocol Buffers Compiler](https://grpc.io/docs/protoc-installation/)
* We run the following commands:

```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# apt-get install -y protobuf-compiler
[...apt-get install output]

root@tthe-pc:/mnt/c/work/hobby/aleph-hack#
```
:::::

:::::details Now, we install [`rust`](https://www.rust-lang.org/tools/install)
* We run the following commands:

```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /root/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

  /root/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /root/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /root/.profile
  /root/.bashrc

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>

info: profile set to 'default'
info: default host triple is x86_64-unknown-linux-gnu
info: syncing channel updates for 'stable-x86_64-unknown-linux-gnu'
info: latest update on 2023-12-28, rust version 1.75.0 (82e1608df 2023-12-21)
info: downloading component 'cargo'
info: downloading component 'clippy'
info: downloading component 'rust-docs'
info: downloading component 'rust-std'
info: downloading component 'rustc'
info: downloading component 'rustfmt'
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
 14.3 MiB /  14.3 MiB (100 %)  13.5 MiB/s in  1s ETA:  0s
info: installing component 'rust-std'
 23.6 MiB /  23.6 MiB (100 %)  22.6 MiB/s in  1s ETA:  0s
info: installing component 'rustc'
 61.4 MiB /  61.4 MiB (100 %)  25.1 MiB/s in  2s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-unknown-linux-gnu'

  stable-x86_64-unknown-linux-gnu installed - rustc 1.75.0 (82e1608df 2023-12-21)


Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, run:
source "$HOME/.cargo/env"
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# source "$HOME/.cargo/env"
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# cargo --version
cargo 1.75.0 (1d8b05cdd 2023-11-20)
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# rustc --version
rustc 1.75.0 (82e1608df 2023-12-21)
```
:::::

:::::details We must install the `cargo-contract` crate
* We run the following commands:

```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# cargo install cargo-contract
    Updating crates.io index
  Downloaded cargo-contract v3.2.0
  Downloaded 1 crate (102.3 KB) in 0.40s
  Installing cargo-contract v3.2.0
    Updating crates.io index
  Downloaded ahash v0.7.7
  Downloaded bs58 v0.5.0
  Downloaded bounded-collections v0.1.9
  Downloaded anstyle v1.0.4
  Downloaded async-global-executor v2.4.1
  Downloaded anstyle-query v1.0.2
  Downloaded anstream v0.6.11
  Downloaded anstyle-parse v0.2.3
  Downloaded sp-wasm-interface v14.0.0
  Downloaded ahash v0.8.7
  Downloaded constant_time_eq v0.1.5
  Downloaded bytecheck_derive v0.6.11
  Downloaded array-bytes v4.2.0
  Downloaded substrate-build-script-utils v5.0.0
  Downloaded async-executor v1.8.0
  Downloaded bytecheck v0.6.11
  Downloaded async-fs v1.6.0
  Downloaded chacha20 v0.9.1
  Downloaded async-trait v0.1.77
  Downloaded subtle-ng v2.5.0
  Downloaded subxt-macro v0.30.1
  Downloaded sp-weights v20.0.0
  Downloaded escape8259 v0.5.2
  Downloaded darling_macro v0.20.3
  Downloaded cxxbridge-flags v1.0.115
  Downloaded current_platform v0.2.0
  Downloaded convert_case v0.4.0
  Downloaded async-task v4.7.0
  Downloaded colored v2.1.0
  Downloaded borsh-derive v1.3.1
  Downloaded bitcoin_hashes v0.11.0
  Downloaded anyhow v1.0.79
  Downloaded intx v0.1.0
  Downloaded joinery v2.1.0
  Downloaded unicode-bidi v0.3.15
  Downloaded merlin v3.0.0
  Downloaded memfd v0.6.4
  Downloaded jsonrpsee-core v0.16.3
  Downloaded nom-supreme v0.7.0
  Downloaded cxx-build v1.0.115
  Downloaded no-std-net v0.6.0
  Downloaded nodrop v0.1.14
  Downloaded wasmparser-nostd v0.100.1
  Downloaded num-bigint v0.4.4
  Downloaded curve25519-dalek-ng v4.1.1
  Downloaded gimli v0.28.1
  Downloaded curve25519-dalek v4.1.1
  Downloaded rkyv_derive v0.7.43
  Downloaded rend v0.4.1
  Downloaded ptr_meta_derive v0.1.4
  Downloaded platforms v3.3.0
  Downloaded pbkdf2 v0.12.2
  Downloaded os_pipe v1.1.5
  Downloaded object v0.32.2
  Downloaded jsonrpsee-ws-client v0.18.2
  Downloaded jsonrpsee-types v0.18.2
  Downloaded jsonrpsee-http-client v0.16.3
  Downloaded jsonrpsee-client-transport v0.18.2
  Downloaded jsonrpsee-client-transport v0.16.3
  Downloaded wasm-opt-sys v0.113.0
  Downloaded socket2 v0.4.10
  Downloaded sharded-slab v0.1.7
  Downloaded polling v3.3.2
  Downloaded sp-runtime-interface-proc-macro v11.0.0
  Downloaded sp-panic-handler v8.0.0
  Downloaded sp-externalities v0.19.0
  Downloaded sp-core v21.0.0
  Downloaded smoldot-light v0.6.0
  Downloaded shared_child v1.0.0
  Downloaded serde_bytes v0.11.14
  Downloaded rustls v0.21.10
  Downloaded ring v0.17.7
  Downloaded sp-tracing v10.0.0
  Downloaded sp-runtime v24.0.0
  Downloaded futures-core v0.3.30
  Downloaded futures v0.3.30
  Downloaded event-listener v4.0.3
  Downloaded smol v1.3.0
  Downloaded scale-value v0.10.0
  Downloaded futures-executor v0.3.30
  Downloaded rkyv v0.7.43
  Downloaded futures-task v0.3.30
  Downloaded backtrace v0.3.69
  Downloaded rustix v0.36.17
  Downloaded snow v0.9.4
  Downloaded futures-sink v0.3.30
  Downloaded http v0.2.11
  Downloaded async-std v1.12.0
  Downloaded futures-macro v0.3.30
  Downloaded futures-lite v2.2.0
  Downloaded futures-channel v0.3.30
  Downloaded fastrand v2.0.1
  Downloaded atomic-waker v1.1.2
  Downloaded event-listener v3.1.0
  Downloaded async-lock v2.8.0
  Downloaded sp-storage v13.0.0
  Downloaded ruzstd v0.4.0
  Downloaded scale-encode v0.3.0
  Downloaded sp-debug-derive v8.0.0
  Downloaded proc-macro-crate v3.1.0
  Downloaded sp-application-crypto v23.0.0
  Downloaded sp-io v23.0.0
  Downloaded simdutf8 v0.1.4
  Downloaded rust_decimal v1.33.1
  Downloaded home v0.5.9
  Downloaded futures-util v0.3.30
  Downloaded wasm-opt v0.113.0
  Downloaded thiserror-impl v1.0.56
  Downloaded getrandom v0.2.12
  Downloaded sp-std v8.0.0
  Downloaded chrono v0.4.31
  Downloaded scale-decode-derive v0.7.0
  Downloaded ptr_meta v0.1.4
  Downloaded sp-runtime-interface v17.0.0
  Downloaded seahash v4.1.0
  Downloaded poly1305 v0.8.0
  Downloaded sp-keystore v0.27.0
  Downloaded scale-decode v0.7.0
  Downloaded platforms v2.0.0
  Downloaded sp-arithmetic v16.0.0
  Downloaded semver v1.0.21
  Downloaded scale-bits v0.3.0
  Downloaded primitive-types v0.12.2
  Downloaded schnorrkel v0.10.2
  Downloaded thiserror-core-impl v1.0.50
  Downloaded syn_derive v0.1.8
  Downloaded form_urlencoded v1.2.1
  Downloaded event-listener-strategy v0.4.0
  Downloaded piper v0.2.1
  Downloaded parking_lot_core v0.9.9
  Downloaded overload v0.1.1
  Downloaded nu-ansi-term v0.46.0
  Downloaded matchers v0.1.0
  Downloaded jsonrpsee-core v0.18.2
  Downloaded iana-time-zone v0.1.59
  Downloaded hyper-rustls v0.24.2
  Downloaded zip v0.6.6
  Downloaded which v4.4.2
  Downloaded url v2.5.0
  Downloaded zeroize v1.7.0
  Downloaded lock_api v0.4.11
  Downloaded parking v2.2.0
  Downloaded tracing-log v0.1.4
  Downloaded walkdir v2.4.0
  Downloaded tokio-macros v2.2.0
  Downloaded waker-fn v1.1.1
  Downloaded jobserver v0.1.27
  Downloaded tempfile v3.9.0
  Downloaded pin-project v1.1.3
  Downloaded mio v0.8.10
  Downloaded smoldot v0.8.0
  Downloaded ref-cast-impl v1.0.22
  Downloaded serde_spanned v0.6.5
  Downloaded siphasher v0.3.11
  Downloaded rustls-webpki v0.101.7
  Downloaded ref-cast v1.0.22
  Downloaded socket2 v0.5.5
  Downloaded slab v0.4.9
  Downloaded sct v0.7.1
  Downloaded rustls-pemfile v1.0.4
  Downloaded proc-macro-crate v2.0.0
  Downloaded tokio v1.35.1
  Downloaded pin-project-lite v0.2.13
  Downloaded pin-project-internal v1.1.3
  Downloaded percent-encoding v2.3.1
  Downloaded kv-log-macro v1.0.7
  Downloaded webpki-roots v0.25.3
  Downloaded libm v0.2.8
  Downloaded zerocopy v0.7.32
  Downloaded tracing-subscriber v0.3.18
  Downloaded h2 v0.3.24
  Downloaded idna v0.5.0
  Downloaded tracing-core v0.1.32
  Downloaded spin v0.9.8
  Downloaded untrusted v0.9.0
  Downloaded unicode-width v0.1.11
  Downloaded try-lock v0.2.5
  Downloaded tracing-log v0.2.0
  Downloaded tracing-attributes v0.1.27
  Downloaded tracing v0.1.40
  Downloaded toml_edit v0.21.0
  Downloaded toml_edit v0.20.7
  Downloaded toml_datetime v0.6.5
  Downloaded tokio-util v0.7.10
  Downloaded thiserror v1.0.56
  Downloaded hyper v0.14.28
  Downloaded httpdate v1.0.3
  Downloaded http-body v0.4.6
  Downloaded futures-io v0.3.30
  Downloaded downcast-rs v1.2.0
  Downloaded crossbeam-queue v0.3.11
  Downloaded concurrent-queue v2.4.0
  Downloaded clap_lex v0.6.0
  Downloaded clap_derive v4.4.7
  Downloaded clap v4.4.18
  Downloaded cargo-platform v0.1.6
  Downloaded bytes v1.5.0
  Downloaded byteorder v1.5.0
  Downloaded blocking v1.5.1
  Downloaded atomic v0.5.3
  Downloaded async-channel v2.1.1
  Downloaded async-attributes v1.1.2
  Downloaded aes-gcm v0.10.3
  Downloaded addr2line v0.21.0
  Downloaded rustix v0.37.27
  Downloaded uuid v1.6.1
  Downloaded wasmi v0.30.0
  Downloaded subxt v0.30.1
  Downloaded clap_builder v4.4.18
  Downloaded jsonrpsee v0.16.3
  Downloaded toml v0.7.8
  Downloaded wasmi_core v0.12.0
  Downloaded darling_core v0.20.3
  Downloaded blake2-rfc v0.2.18
  Downloaded base64 v0.21.7
  Downloaded indexmap-nostd v0.4.0
  Downloaded indent_write v2.2.0
  Downloaded yap v0.10.0
  Downloaded wasmi_arena v0.4.0
  Downloaded value-bag v1.6.0
  Downloaded sp-trie v22.0.0
  Downloaded dyn-clone v1.0.16
  Downloaded duct v0.13.7
  Downloaded derivative v2.2.0
  Downloaded cxxbridge-macro v1.0.115
  Downloaded contract-metadata v3.2.0
  Downloaded chacha20poly1305 v0.10.1
  Downloaded borsh v1.3.1
  Downloaded blake2b_simd v1.0.2
  Downloaded thiserror-core v1.0.50
  Downloaded subxt-lightclient v0.30.1
  Downloaded subxt-codegen v0.30.1
  Downloaded substrate-bip39 v0.4.5
  Downloaded curve25519-dalek-derive v0.1.1
  Downloaded crossbeam-utils v0.8.19
  Downloaded contract-build v3.2.0
  Downloaded brownstone v1.1.0
  Downloaded async-signal v0.2.5
  Downloaded async-process v1.8.1
  Downloaded async-io v2.3.0
  Downloaded jsonrpsee v0.18.2
  Downloaded wasm-opt-cxx-sys v0.113.0
  Downloaded term_size v0.3.2
  Downloaded target-lexicon v0.12.13
  Downloaded ss58-registry v1.45.0
  Downloaded darling v0.20.3
  Downloaded async-net v1.8.0
  Downloaded contract-transcode v3.2.0
  Downloaded async-lock v3.3.0
  Downloaded base58 v0.2.0
  Downloaded pallet-contracts-primitives v24.0.0
  Downloaded jsonrpsee-types v0.16.3
  Downloaded subxt-metadata v0.30.1
  Downloaded arrayvec v0.4.12
  Downloaded subxt-signer v0.30.1
  Downloaded scale-encode-derive v0.3.0
  Downloaded sp-core-hashing v9.0.0
  Downloaded bip39 v2.0.0
  Downloaded cxx v1.0.115
  Downloaded sp-state-machine v0.28.0
  Downloaded frame-metadata v15.1.0
  Downloaded 261 crates (31.7 MB) in 1.57s (largest was `smoldot` at 10.3 MB)     
   Compiling proc-macro2 v1.0.76
   Compiling unicode-ident v1.0.12
   Compiling cfg-if v1.0.0
   Compiling version_check v0.9.4
   Compiling libc v0.2.152
   Compiling typenum v1.17.0
   Compiling serde v1.0.195
   Compiling autocfg v1.1.0
   Compiling syn v1.0.109
   Compiling hashbrown v0.14.3
   Compiling equivalent v1.0.1
   Compiling once_cell v1.19.0
   Compiling winnow v0.5.34
   Compiling toml_datetime v0.6.5
   Compiling anyhow v1.0.79
   Compiling thiserror v1.0.56
   Compiling pin-project-lite v0.2.13
   Compiling arrayvec v0.7.4
   Compiling bytes v1.5.0
   Compiling memchr v2.7.1
   Compiling subtle v2.4.1
   Compiling generic-array v0.14.7
   Compiling slab v0.4.9
   Compiling byte-slice-cast v1.2.2
   Compiling ppv-lite86 v0.2.17
   Compiling value-bag v1.6.0
   Compiling tracing-core v0.1.32
   Compiling futures-core v0.3.30
   Compiling radium v0.7.0
   Compiling byteorder v1.5.0
   Compiling fnv v1.0.7
   Compiling indexmap v2.1.0
   Compiling tap v1.0.1
   Compiling log v0.4.20
   Compiling wyz v0.5.1
   Compiling funty v2.0.0
   Compiling futures-io v0.3.30
   Compiling quote v1.0.35
   Compiling cpufeatures v0.2.12
   Compiling itoa v1.0.10
   Compiling smallvec v1.13.0
   Compiling syn v2.0.48
   Compiling serde_json v1.0.111
   Compiling bitvec v1.0.1
   Compiling ryu v1.0.16
   Compiling jobserver v0.1.27
   Compiling tinyvec_macros v0.1.1
   Compiling cc v1.0.83
   Compiling tinyvec v1.6.0
   Compiling ahash v0.7.7
   Compiling rustix v0.38.30
   Compiling crc32fast v1.3.2
   Compiling opaque-debug v0.3.0
   Compiling ident_case v1.0.1
   Compiling futures-sink v0.3.30
   Compiling static_assertions v1.1.0
   Compiling toml_edit v0.20.7
   Compiling toml_edit v0.19.15
   Compiling linux-raw-sys v0.4.13
   Compiling strsim v0.10.0
   Compiling bitflags v2.4.2
   Compiling digest v0.9.0
   Compiling crypto-common v0.1.6
   Compiling block-buffer v0.10.4
   Compiling block-buffer v0.9.0
   Compiling indexmap v1.9.3
   Compiling crunchy v0.2.2
   Compiling getrandom v0.2.12
   Compiling num_cpus v1.16.0
   Compiling digest v0.10.7
   Compiling pin-utils v0.1.0
   Compiling futures-channel v0.3.30
   Compiling rand_core v0.6.4
   Compiling unicode-normalization v0.1.22
   Compiling rand_chacha v0.3.1
   Compiling hashbrown v0.12.3
   Compiling percent-encoding v2.3.1
   Compiling futures-task v0.3.30
   Compiling unicode-bidi v0.3.15
   Compiling keccak v0.1.5
   Compiling form_urlencoded v1.2.1
   Compiling rand v0.8.5
   Compiling ahash v0.8.7
   Compiling ring v0.17.7
   Compiling idna v0.5.0
   Compiling getrandom v0.1.16
   Compiling num-traits v0.2.17
   Compiling proc-macro-crate v2.0.0
   Compiling zerocopy v0.7.32
   Compiling hex v0.4.3
   Compiling io-lifetimes v1.0.11
   Compiling arrayref v0.3.7
   Compiling rustls v0.21.10
   Compiling rustc-hash v1.1.0
   Compiling sp-std v8.0.0
   Compiling rustc-hex v2.1.0
   Compiling rand_core v0.5.1
   Compiling hashbrown v0.13.2
   Compiling proc-macro-crate v1.3.1
   Compiling bitflags v1.3.2
   Compiling paste v1.0.14
   Compiling base64 v0.13.1
   Compiling fixed-hash v0.8.0
   Compiling uint v0.9.5
   Compiling sha2 v0.10.8
   Compiling aho-corasick v1.1.2
   Compiling async-trait v0.1.77
   Compiling regex-syntax v0.8.2
   Compiling fallible-iterator v0.2.0
   Compiling lazy_static v1.4.0
   Compiling stable_deref_trait v1.2.0
   Compiling target-lexicon v0.12.13
   Compiling sha3 v0.10.8
   Compiling blake2 v0.10.6
   Compiling memoffset v0.8.0
   Compiling regex-syntax v0.6.29
   Compiling rustix v0.36.17
   Compiling darling_core v0.14.4
   Compiling wasmtime-runtime v8.0.1
   Compiling sha2 v0.9.9
   Compiling socket2 v0.5.5
   Compiling mio v0.8.10
   Compiling generic-array v0.12.4
   Compiling cpp_demangle v0.3.5
   Compiling linux-raw-sys v0.1.4
   Compiling rustc-demangle v0.1.23
   Compiling libsecp256k1-core v0.3.0
   Compiling regex-automata v0.4.3
   Compiling psm v0.1.21
   Compiling regex-automata v0.1.10
   Compiling memfd v0.6.4
   Compiling wasmtime-jit-debug v8.0.1
   Compiling wasmtime-asm-macros v8.0.1
   Compiling serde_derive v1.0.195
   Compiling thiserror-impl v1.0.56
   Compiling tracing-attributes v0.1.27
   Compiling tokio-macros v2.2.0
   Compiling zeroize_derive v1.4.2
   Compiling futures-macro v0.3.30
   Compiling parity-scale-codec-derive v3.6.9
   Compiling impl-trait-for-tuples v0.2.2
   Compiling scale-info-derive v2.10.0
   Compiling derive_more v0.99.17
   Compiling zeroize v1.7.0
   Compiling darling_macro v0.14.4
   Compiling futures-util v0.3.30
   Compiling regex v1.10.2
   Compiling tracing v0.1.40
   Compiling darling v0.14.4
   Compiling tokio v1.35.1
   Compiling ref-cast v1.0.22
   Compiling Inflector v0.11.4
   Compiling byte-tools v0.3.1
   Compiling crossbeam-utils v0.8.19
   Compiling constant_time_eq v0.3.0
   Compiling rustversion v1.0.14
   Compiling blake2b_simd v1.0.2
   Compiling block-padding v0.1.5
   Compiling pin-project-internal v1.1.3
   Compiling ref-cast-impl v1.0.22
   Compiling digest v0.8.1
   Compiling sharded-slab v0.1.7
   Compiling futures-executor v0.3.30
   Compiling futures v0.3.30
   Compiling twox-hash v1.6.3
   Compiling wasmtime-jit-icache-coherence v8.0.1
   Compiling thread_local v1.1.7
   Compiling httparse v1.8.0
   Compiling untrusted v0.9.0
   Compiling iana-time-zone v0.1.59
   Compiling event-listener v2.5.3
   Compiling wasmtime v8.0.1
   Compiling spin v0.9.8
   Compiling chrono v0.4.31
   Compiling sp-core-hashing v9.0.0
   Compiling block-buffer v0.7.3
   Compiling matchers v0.0.1
   Compiling sp-debug-derive v8.0.0
   Compiling libsecp256k1-gen-genmult v0.3.0
   Compiling libsecp256k1-gen-ecmult v0.3.0
   Compiling http v0.2.11
   Compiling rand_chacha v0.2.2
   Compiling secp256k1-sys v0.6.1
   Compiling crypto-mac v0.8.0
   Compiling crypto-mac v0.11.1
   Compiling tracing-log v0.1.4
   Compiling lock_api v0.4.11
   Compiling unicode-xid v0.2.4
   Compiling parking v2.2.0
   Compiling ansi_term v0.12.1
   Compiling hash-db v0.16.0
   Compiling opaque-debug v0.2.3
   Compiling parking_lot_core v0.9.9
   Compiling fake-simd v0.1.2
   Compiling sha2 v0.8.2
   Compiling tokio-util v0.7.10
   Compiling hmac v0.8.1
   Compiling rand v0.7.3
   Compiling concurrent-queue v2.4.0
   Compiling libsecp256k1 v0.7.1
   Compiling async-lock v2.8.0
   Compiling parity-scale-codec v3.6.9
   Compiling impl-serde v0.4.0
   Compiling url v2.5.0
   Compiling cranelift-entity v0.95.1
   Compiling bincode v1.3.3
   Compiling tracing-serde v0.1.3
   Compiling beef v0.5.2
   Compiling curve25519-dalek v2.1.3
   Compiling curve25519-dalek v3.2.0
   Compiling gimli v0.27.3
   Compiling object v0.30.4
   Compiling scale-info v2.10.0
   Compiling impl-codec v0.6.0
   Compiling wasmparser v0.102.0
   Compiling sp-storage v13.0.0
   Compiling merlin v2.0.1
   Compiling ss58-registry v1.45.0
   Compiling tracing-subscriber v0.2.25
   Compiling hmac v0.12.1
   Compiling environmental v1.1.4
   Compiling scopeguard v1.2.0
   Compiling try-lock v0.2.5
   Compiling arrayvec v0.5.2
   Compiling scratch v1.0.7
   Compiling schnorrkel v0.9.1
   Compiling want v0.3.1
   Compiling primitive-types v0.12.2
   Compiling sp-externalities v0.19.0
   Compiling sp-tracing v10.0.0
   Compiling h2 v0.3.24
   Compiling hmac-drbg v0.3.0
   Compiling http-body v0.4.6
   Compiling pbkdf2 v0.8.0
   Compiling hmac v0.11.0
   Compiling sp-runtime-interface-proc-macro v11.0.0
   Compiling secrecy v0.8.0
   Compiling dyn-clonable-impl v0.9.0
   Compiling link-cplusplus v1.0.9
   Compiling addr2line v0.19.0
   Compiling pbkdf2 v0.11.0
   Compiling wasmtime-types v8.0.1
   Compiling num-format v0.4.4
   Compiling base64 v0.21.7
   Compiling dyn-clone v1.0.16
   Compiling unicode-width v0.1.11
   Compiling termcolor v1.4.1
   Compiling wasmtime-environ v8.0.1
   Compiling heck v0.4.1
   Compiling tower-service v0.3.2
   Compiling httpdate v1.0.3
   Compiling fastrand v2.0.1
   Compiling codespan-reporting v0.11.1
   Compiling rustls-pemfile v1.0.4
   Compiling dyn-clonable v0.9.0
   Compiling hyper v0.14.28
   Compiling tiny-bip39 v1.0.0
   Compiling substrate-bip39 v0.4.5
   Compiling parking_lot v0.12.1
   Compiling bounded-collections v0.1.9
   Compiling ed25519-zebra v3.1.0
   Compiling hash256-std-hasher v0.15.2
   Compiling wasmtime-jit v8.0.1
   Compiling futures-timer v3.0.2
   Compiling cxxbridge-flags v1.0.115
   Compiling either v1.9.0
   Compiling openssl-probe v0.1.5
   Compiling bs58 v0.4.0
   Compiling array-bytes v4.2.0
   Compiling rustls-native-certs v0.6.3
   Compiling cxx v1.0.115
   Compiling jsonrpsee-types v0.16.3
   Compiling cxx-build v1.0.115
   Compiling event-listener v4.0.3
   Compiling backtrace v0.3.69
   Compiling sha-1 v0.9.8
   Compiling adler v1.0.2
   Compiling webpki-roots v0.25.3
   Compiling gimli v0.28.1
   Compiling miniz_oxide v0.7.1
   Compiling jsonrpsee-core v0.16.3
   Compiling soketto v0.7.1
   Compiling event-listener-strategy v0.4.0
   Compiling scale-bits v0.4.0
   Compiling pin-project v1.1.3
   Compiling sp-wasm-interface v14.0.0
   Compiling scale-decode-derive v0.9.0
   Compiling scale-encode-derive v0.5.0
   Compiling secp256k1-sys v0.8.1
   Compiling object v0.32.2
   Compiling semver v1.0.21
   Compiling addr2line v0.21.0
   Compiling sp-runtime-interface v17.0.0
   Compiling scale-encode v0.5.0
   Compiling wasm-opt-sys v0.113.0
   Compiling scale-decode v0.9.0
   Compiling trie-db v0.27.1
   Compiling trie-root v0.18.0
   Compiling memory-db v0.32.0
   Compiling schnellru v0.2.1
   Compiling proc-macro-error-attr v1.0.4
   Compiling ink_prelude v4.3.0
   Compiling signature v1.6.4
   Compiling nohash-hasher v0.2.0
   Compiling xxhash-rust v0.8.8
   Compiling ed25519 v1.5.3
   Compiling async-lock v3.3.0
   Compiling futures-lite v2.2.0
   Compiling scale-bits v0.3.0
   Compiling sp-io v23.0.0
   Compiling cxxbridge-macro v1.0.115
   Compiling darling_core v0.20.3
   Compiling frame-metadata v16.0.0
   Compiling proc-macro-error v1.0.4
   Compiling utf8parse v0.2.1
   Compiling platforms v2.0.0
   Compiling anstyle-parse v0.2.3
   Compiling ed25519-dalek v1.0.1
   Compiling wasm-opt-cxx-sys v0.113.0
   Compiling jsonrpsee-types v0.18.2
   Compiling ink_primitives v4.3.0
   Compiling tokio-stream v0.1.14
   Compiling subxt-metadata v0.30.1
   Compiling sp-panic-handler v8.0.0
   Compiling scale-encode-derive v0.3.0
   Compiling scale-decode-derive v0.7.0
   Compiling integer-sqrt v0.1.5
   Compiling polling v2.8.0
   Compiling same-file v1.0.6
   Compiling anstyle v1.0.4
   Compiling async-task v4.7.0
   Compiling anstyle-query v1.0.2
   Compiling colorchoice v1.0.0
   Compiling atomic-waker v1.1.2
   Compiling rustix v0.37.27
   Compiling camino v1.1.6
   Compiling darling_macro v0.20.3
   Compiling base58 v0.2.0
   Compiling current_platform v0.2.0
   Compiling scale-encode v0.3.0
   Compiling piper v0.2.1
   Compiling anstream v0.6.11
   Compiling scale-decode v0.7.0
   Compiling walkdir v2.4.0
   Compiling sp-arithmetic v16.0.0
   Compiling jsonrpsee-core v0.18.2
   Compiling ink_metadata v4.3.0
   Compiling zip v0.6.6
   Compiling darling v0.20.3
   Compiling async-channel v2.1.1
   Compiling strum_macros v0.24.3
   Compiling frame-metadata v15.1.0
   Compiling serde_spanned v0.6.5
   Compiling polling v3.3.2
   Compiling async-io v1.13.0
   Compiling subtle-ng v2.5.0
   Compiling waker-fn v1.1.1
   Compiling clap_lex v0.6.0
   Compiling minimal-lexical v0.2.1
   Compiling linux-raw-sys v0.3.8
   Compiling home v0.5.9
   Compiling fastrand v1.9.0
   Compiling yap v0.10.0
   Compiling which v4.4.2
   Compiling nom v7.1.3
   Compiling futures-lite v1.13.0
   Compiling scale-value v0.10.0
   Compiling strum v0.24.1
   Compiling clap_builder v4.4.18
   Compiling curve25519-dalek-ng v4.1.1
   Compiling async-io v2.3.0
   Compiling ink_storage_traits v4.3.0
   Compiling contract-build v3.2.0
   Compiling blocking v1.5.1
   Compiling substrate-build-script-utils v5.0.0
   Compiling async-executor v1.8.0
   Compiling contract-metadata v3.2.0
   Compiling tempfile v3.9.0
   Compiling clap_derive v4.4.7
   Compiling cargo-platform v0.1.6
   Compiling serde_bytes v0.11.14
   Compiling merlin v3.0.0
   Compiling derivative v2.2.0
   Compiling os_pipe v1.1.5
   Compiling shared_child v1.0.0
   Compiling socket2 v0.4.10
   Compiling brownstone v1.1.0
   Compiling ink_allocator v4.3.0
   Compiling joinery v2.1.0
   Compiling overload v0.1.1
   Compiling rust_decimal v1.33.1
   Compiling indent_write v2.2.0
   Compiling bitcoin_hashes v0.11.0
   Compiling nom-supreme v0.7.0
   Compiling nu-ansi-term v0.46.0
   Compiling duct v0.13.7
   Compiling toml v0.7.8
   Compiling schnorrkel v0.10.2
   Compiling cargo_metadata v0.15.4
   Compiling async-global-executor v2.4.1
   Compiling cargo-contract v3.2.0
   Compiling bip39 v2.0.0
   Compiling rustc_version v0.4.0
   Compiling itertools v0.10.5
   Compiling clap v4.4.18
   Compiling async-channel v1.9.0
   Compiling escape8259 v0.5.2
   Compiling async-attributes v1.1.2
   Compiling matchers v0.1.0
   Compiling colored v2.1.0
   Compiling pbkdf2 v0.12.2
   Compiling term_size v0.3.2
   Compiling kv-log-macro v1.0.7
   Compiling tracing-log v0.2.0
   Compiling parity-wasm v0.45.0
   Compiling tracing-subscriber v0.3.18
   Compiling async-std v1.12.0
   Compiling secp256k1 v0.27.0
   Compiling secp256k1 v0.24.3
   Compiling ink_engine v4.3.0
   Compiling sp-core v21.0.0
   Compiling ink_env v4.3.0
   Compiling contract-transcode v3.2.0
   Compiling sp-trie v22.0.0
   Compiling sp-keystore v0.27.0
   Compiling sct v0.7.1
   Compiling rustls-webpki v0.101.7
   Compiling sp-state-machine v0.28.0
   Compiling sp-weights v20.0.0
   Compiling tokio-rustls v0.24.1
   Compiling jsonrpsee-client-transport v0.16.3
   Compiling hyper-rustls v0.24.2
   Compiling jsonrpsee-http-client v0.16.3
   Compiling sp-application-crypto v23.0.0
   Compiling jsonrpsee v0.16.3
   Compiling jsonrpsee-client-transport v0.18.2
   Compiling subxt-codegen v0.30.1
   Compiling jsonrpsee-ws-client v0.18.2
   Compiling sp-runtime v24.0.0
   Compiling jsonrpsee v0.18.2
   Compiling subxt-macro v0.30.1
   Compiling pallet-contracts-primitives v24.0.0
   Compiling subxt v0.30.1
   Compiling subxt-signer v0.30.1
   Compiling wasm-opt v0.113.0
    Finished release [optimized] target(s) in 2m 02s
  Installing /root/.cargo/bin/cargo-contract
   Installed package `cargo-contract v3.2.0` (executable `cargo-contract`)        
root@tthe-pc:/mnt/c/work/hobby/aleph-hack#
```
:::::

:::::details We do `rustup component add rust-src`
```bash
root@tthe-pc:/mnt/c/work/hobby/aleph-hack# rustup component add rust-src
info: downloading component 'rust-src'
info: installing component 'rust-src'
root@tthe-pc:/mnt/c/work/hobby/aleph-hack#
```
:::::
