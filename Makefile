push-guategeeks:
	git branch -D GuateGeeksAR
	git checkout --orphan GuateGeeksAR
	git add .
	git commit -m "GuateGeeksAR"
	git push -u guategeeks +GuateGeeksAR:main
	git checkout main