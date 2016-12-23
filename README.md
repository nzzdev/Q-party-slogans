# NZZ Storytelling Q Party Slogans

## This is WIP for now
Things to look at:
  * https://github.com/tlivings/enjoi

## development
run `./node_modules/forever/bin/forever --watch --watchDirectory ./ index.js` to have a server restarting on changes


-----

## Travis Setup
  * Github Token for JSPM: https://gist.github.com/topheman/25241e48a1b4f91ec6d4
  * `travis encrypt JSPM_GITHUB_AUTH_TOKEN= --add`
  * `travis encrypt KEYCDN_API_KEY= --add`
  * `travis encrypt AWS_SECRET_ACCESS_KEY= --add`
  * `travis encrypt AWS_ACCESS_KEY_ID= --add`
  * `travis encrypt "nzz:token" --add notifications.slack`
