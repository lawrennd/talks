# talks

Talks from Neil Lawrence

To create talks from these files you need to access the python package `makemd`. This package includes a macro language implemented in the generic preprocessor, `gpp` for interpeting the markdown.

You can install with

```
apt-get install gpp
<<<<<<< HEAD
pip install makemd
=======
pip install lamd
>>>>>>> b0e8ebe42a1744cd58f60d0f975e8347690d60e0
```

The talks folder is organized as follows.

Each general subject or lecture series comes under a sub-directory 

```
_subject/
```

<<<<<<< HEAD
Under that subject, there are a series of talks. Each as a markdown file. These files include various talk files from different parts of the site. They are also allocated to different subject files, under the includes subdirectory.
=======
Under that subject, there are a series of talks. Each as a markdown file. These files include various snippet files mainly from anothe repository. <https://github.com/lawrennd/snippets/>. They are also allocated to different subject files.
>>>>>>> b0e8ebe42a1744cd58f60d0f975e8347690d60e0

```
_subject/includes/
```

Different subjects have their own configuration files that are found in

```
<<<<<<< HEAD
_subject/_config.yml
=======
_subject/_lamd.yml
>>>>>>> b0e8ebe42a1744cd58f60d0f975e8347690d60e0
```

