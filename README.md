Run postgres database
```docker run --name postgresql --restart=always --network dbcon -e POSTGRES_USER=guest -e POSTGRES_PASSWORD=guest -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres```