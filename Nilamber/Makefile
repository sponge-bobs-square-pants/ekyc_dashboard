docker-prod:
	docker build -t nilamber:v0.6.0-prod -f Dockerfile .
run:
	docker run -d -p 5000:5000 -e MONGO_URI="mongodb+srv://polo15s:Polo15s_123@nodeapi.ccn5kqk.mongodb.net/Nilamber?retryWrites=true&w=majority" nilamber:v0.6.0-prod
