#!/bin/bash
DEVELOP_KEY=1Hipk6UGg5PNUHFoLEA7b6EexIUvsJUJPsPrCjQm37lAxqNM_VHwLDf81

PRODUCTION_KEY=1ooLSN8Uq84qjMSl1RmiTLlRBL8gdnJ-DJxZ6H1pDa5eOCZQWaST7iICh

CLASP_FILE=.clasp.json

echo "Upload files to production"

echo "Are you sure(Y/n)?"

read SURE

echo ""

case $SURE in
    y)
        ;;
    Y)
        ;;
    *)
        echo 'Action canceled - Exit'

        exit 1
        ;;
esac

echo "Replace key for production..."

echo "{\"scriptId\":\"$PRODUCTION_KEY\"}" > $CLASP_FILE

cat $CLASP_FILE

echo "Upload files..."

clasp push

echo "Restore key to develop..."

echo "{\"scriptId\":\"$DEVELOP_KEY\"}" > $CLASP_FILE

cat $CLASP_FILE

echo "Done."