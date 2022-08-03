### Apply yml

```bash
$ kubectl apply -f {yml_file}
```

### Iterative container inside pod

```bash
$ kubectl exec -it {pod_metadata_name} -- bash
```

### Describe

```bash
$ kubectl describe pod db-users
```

### Logs

```bash
$ kubectl logs mailer
```
