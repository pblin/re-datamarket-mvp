#!/bin/bash
while read f; do
/Users/bernardlin/py3/bin/python ./load_sample_data.py $f
done < ./manifest
