# talks

Talks from Neil Lawrence

To create talks from these files you need to access the python package `makemd`. This package includes a macro language implemented in the generic preprocessor, `gpp` for interpeting the markdown.

You can install with

```
apt-get install gpp
pip install lamd
```

The talks folder is organized as follows.

Each general subject or lecture series comes under a sub-directory 

```
_subject/
```

Under that subject, there are a series of talks. Each as a markdown file. These files include various snippet files mainly from anothe repository. <https://github.com/lawrennd/snippets/>. They are also allocated to different subject files.

```
_subject/includes/
```

Different subjects have their own configuration files that are found in

```
_subject/_config.yml
```

