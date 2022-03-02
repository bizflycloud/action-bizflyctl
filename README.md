# GitHub Actions for BizflyCloud
This action enables you to interact with Bizfly Cloud services by installing the `bizflyctl` command-line client

# Usage
To install the lastest version of `bizflyctl` and use it in GitHub Actions workflows, add the following step to your workflow

```yaml
env:
  BIZFLY_CLOUD_EMAIL: ${{ secrets.BIZFLY_CLOUD_EMAIL }}
  BIZFLY_CLOUD_PASSWORD: ${{ secrets.BIZFLY_CLOUD_PASSWORD }}
  
- name: Install bizflyctl
  uses: bizflycloud/action-bizflyctl
  with:
    version: "v0.2.2"
```

`bizflyctl` will now be available in the virtual environment and can be used directly in following steps.

# Arguments
- `version`: The version of bizflyctl to use

# Environment Arguments
- `BIZFLY_CLOUD_EMAIL` - (Required) the Bizfly Cloud login email
- `BIZFLY_CLOUD_PASSWORD` - (Required) the Bizfly Cloud login email