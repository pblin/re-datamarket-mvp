#!/bin/bash
if [ `ps -ef | grep 'run watch' | wc -l` -lt 2 ]; then
       cd /home/mvp/webapp/server && nohup yarn run watch  &
fi

if [ `ps -ef | grep 'run serve' | wc -l` -lt 2 ]; then
       cd /home/mvp/webapp/server && nohup yarn run serve  &
fi

