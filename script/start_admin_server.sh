# Refresh Admin Resource
cd ~/ProjectT/script/
sh refresh_admin_resource.sh

# Reload OR Start 서버
cd ~/ProjectT/
pm2 reload rumdice-admin starter_admin.json || pm2 start starter_admin.json --env dev
pm2 list