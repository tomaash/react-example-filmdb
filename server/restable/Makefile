TESTS = test/**/*.coffee
REPORTER = dot

test:
	@NODE_ENV=test NODE_TLS_REJECT_UNAUTHORIZED=0 ./node_modules/.bin/mocha \
		--harmony \
		--require should \
		--require co-mocha \
		--compilers coffee:coffee-script/register \
		--reporter $(REPORTER) \
		--timeout 5000 \
		--growl \
		$(TESTS)

test-cov: lib-cov
	SUPERAGENT_COV=1 $(MAKE) test REPORTER=html-cov > docs/coverage.html

lib-cov:
	jscoverage lib lib-cov

test-server:
	@node --harmony example/app

docs: test-docs

md: test-md

test-docs:
	make test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

test-md:
	make test REPORTER=markdown > docs/docs.md
.PHONY: test-cov test docs test-docs
