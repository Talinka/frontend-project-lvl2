install:
	npm install

build:
	rm -rf dist
	npm run build

publish:
	npm publish ---dry-run
	npm link

start:
	npx babel-node src/bin/gendiff.js

lint:
	npx eslint .

test:
	npm test
