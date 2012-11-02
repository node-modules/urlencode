TESTS = test/*.js
REPORTER = spec
TIMEOUT = 10000
JSCOVERAGE = ./node_modules/.bin/jscover

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)

test-cov:
	@rm -rf ./lib-cov
	@$(MAKE) lib-cov
	@URLENCODE_COV=1 $(MAKE) test
	@URLENCODE_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@$(JSCOVERAGE) lib $@

benchmark:
	@node benchmark/urlencode.js

.PHONY: test-cov test lib-cov benchmark
