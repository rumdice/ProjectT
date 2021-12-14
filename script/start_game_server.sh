cd ~/ProjectT/script/

# Reload OR Start
pm2 reload rumdice-game starter_game.json || pm2 start starter_game.json --env dev
pm2 list