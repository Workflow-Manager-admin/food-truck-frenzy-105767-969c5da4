#!/bin/bash
cd /home/kavia/workspace/code-generation/food-truck-frenzy-105767-969c5da4/food_chain_frenzy_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

