#!/bin/bash

for ENTRY in "additional_modules/"*; do
  ln -snf "../$ENTRY" "node_modules/$(basename $ENTRY)"
done