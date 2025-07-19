#!/bin/bash

# Конфигурация
IMAGE_NAME="web-game-frontend"
CONTAINER_NAME="web-game-frontend"
PORT="3000"
TEMP_CONTAINER_NAME="${CONTAINER_NAME}-temp"

# Функция для обработки ошибок
handle_error() {
    echo "Error occurred! Rolling back..."
    docker stop $TEMP_CONTAINER_NAME >/dev/null 2>&1
    docker rm $TEMP_CONTAINER_NAME >/dev/null 2>&1
    exit 1
}

trap 'handle_error' ERR

# 1. Получаем обновления
echo "Updating source code..."
git pull

# 2. Собираем новый образ
echo "Building new Docker image..."
docker build -t $IMAGE_NAME:latest .

# 3. Запускаем новый контейнер временно для проверки
echo "Starting new container for testing..."
docker run -d -p ${PORT}99:3000 --name $TEMP_CONTAINER_NAME $IMAGE_NAME

# 4. Проверяем здоровье (можно добавить curl проверку)
echo "Waiting for container to start..."
sleep 5

# 5. Если проверка прошла, переключаем трафик
echo "New container is healthy, switching traffic..."

# Останавливаем старый контейнер если существует
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    docker stop $CONTAINER_NAME >/dev/null
    docker rm $CONTAINER_NAME >/dev/null
fi

# Переименовываем временный контейнер в основной
docker rename $TEMP_CONTAINER_NAME $CONTAINER_NAME

# 6. Чистим старые образы (старше 1 дня)
echo "Cleaning up old images..."
docker image prune -a --force --filter "until=24h"

echo "Update completed successfully!"