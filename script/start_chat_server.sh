cd ~/ProjectT/script/

# Reload OR Start
pm2 reload rumdice-chat starter_chat.json || pm2 start starter_chat.json --env dev
pm2 list