#!/bin/bash

grep "@astrojs/" package.json |
	sed 's/.*"@astrojs\([^"]*\)".*/@astrojs\1/' |
	while read -r dependency; do
		pnpm i "${dependency}@latest"
	done
