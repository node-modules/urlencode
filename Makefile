TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 10000
MOCHA_OPTS =

install:
	@npm install --registry=http://registry.npm.taobao.org

jshint: install
	@./node_modules/.bin/jshint .

test: install
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@rm -f coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=travis-cov
	@ls -lh coverage.html

test-coveralls: jshint
	@$(MAKE) test
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@-$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=mocha-lcov-reporter | ./node_modules/.bin/coveralls

benchmark:
	@node benchmark/urlencode.js
	@node benchmark/urlencode.decode.js

test-all: jshint test test-cov benchmark

autod: install
	@./node_modules/.bin/autod -w -e benchmark --prefix "~"
	@$(MAKE) install

contributors: install
	@./node_modules/.bin/contributors -f plain -o AUTHORS

.PHONY: test benchmark
