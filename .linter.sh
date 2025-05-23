#!/bin/bash
cd /home/kavia/workspace/code-generation/polyvoice-multilingual-text-to-speech-converter-2201-7291/polyvoice
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

