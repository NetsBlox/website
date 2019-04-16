# Protected Assets
This directory should be protected from public access.

If using Nginx use the following directive
```
location /protected-assets/ {
  auth_basic "Protected Assets";
  auth_basic_user_file /path/to/.htpasswd;
  try_files $uri @myApp;
}
```
