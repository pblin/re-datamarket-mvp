#!/bin/bash

ID=$(echo $HOSTNAME | awk -F"_" '{print $NF}')
CORE=$(getent hosts enigma_core_$ID | awk '{ print $1 }')

# Configuration specific to the docker network
sed -i'' -e "s#\(\"IPC_HOST\": \)\(\".*\"\)#\1\"$CORE\"#g" ~/surface/src/surface/config.json
sed -i'' -e "s#\(\"PROVIDER_URL\": \)\(\".*\"\)#\1\"http://contract:8545\"#g" ~/surface/src/surface/config.json
sed -i'' -e 's#\("CONTRACT_PATH": \)\(".*"\)#\1"/var/lib/built_contracts/Enigma.json"#g'  ~/surface/src/surface/config.json 
sed -i'' -e 's#\("TOKEN_PATH": \)\(".*"\)#\1"/var/lib/built_contracts/EnigmaToken.json"#g'  ~/surface/src/surface/config.json 
sed -i'' -e "s#\(\"WORKER_ID\": \)\(.*\)#\1$ID#g"  ~/surface/src/surface/config.json


# Tests (TMP)
sed -i'' -e "s/localhost/contract/g" ~/surface/src/tests/data/config.json
sed -i'' -e 's#\("CONTRACT_PATH": \)\(".*"\)#\1"/var/lib/built_contracts/Enigma.json"#g'  ~/surface/src/tests/data/config.json
sed -i'' -e 's#\("TOKEN_PATH": \)\(".*"\)#\1"/var/lib/built_contracts/EnigmaToken.json"#g'  ~/surface/src/tests/data/config.json
sed -i'' -e 's#\("COIN_MIXER_PATH": \)\(".*"\)#\1"/var/lib/built_contracts/CoinMixer.json"#g'  ~/surface/src/tests/data/config.json