WELCOME=\033[37m mlb-data \033[39m

all: hello webpack

hello:
	@echo "\n${WELCOME}\n"

webpack:
	@babel-node scripts/server/server.js
