#!/bin/bash

# delete old resource
echo "admin tool old resource delete start"
rm -rf ../out/admin_svr/views
rm -rf ../out/admin_svr/public
echo "admin tool old resource delete done"

# copy new resource
echo "admin tool new resource copy start"
cp -r ../admin_svr/views/ ../out/admin_svr/views
cp -r ../admin_svr/public/ ../out/admin_svr/public
echo "admin tool new resource copy start"
