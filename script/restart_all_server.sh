#!/bin/bash


echo "admin server restart"
sh start_admin_server.sh
echo "admin server done"


echo "game server restart"
sh start_game_server.sh
echo "game server done"


echo "chat server restart"
sh start_chat_server.sh
echo "chat server done"


echo "ALL server restart done"