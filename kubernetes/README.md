# Useful k8s commands

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

### Logs

```bash
$ kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```
