all: out/math

out/math: math/*.org
	mkdir -p out/math
	emacs math/*.org -Q --batch -f org-html-export-to-html --kill
	mv math/*.html out/math
