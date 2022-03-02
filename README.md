# GitHub Actions for BizflyCloud
This action enables you to interact with Bizfly Cloud services by installing the `bizflyctl` command-line client

# Usage
To install the lastest version of `bizflyctl` and use it in GitHub Actions workflows, add the following step to your workflow

```yaml
- name: Install bizflyctl
  uses: bizflycloud/action-bizflyctl
  with:
    email: abc@xyz.com
    password: asfdsdf
```

`bizflyctl` will now be available in the virtual environment and can be used directly in following steps.


# Arguments
- `email` - (Required) the Bizfly Cloud login email
- `password` - (Required) the Bizfly Cloud login email