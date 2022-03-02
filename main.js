const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');
const {Octokit} = require("@octokit/rest");

const baseDownloadURL = "https://github.com/bizflycloud/bizflyctl/releases/download"
const fallbackVersion = "0.2.1"
const octokit = new Octokit();

async function downloadBizflyctl(version) {
    if (process.platform === 'win32') {
        const bizflyctlDownload = await tc.DowloadTool(`${baseDownloadURL}/v${version}/bizflyctl_Windows_x86_64.zip`)
        return tc.extractZip(bizflyctlDownload)
    }
    if (process.platform === 'darwin') {
        const bizflyctlDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/bizflyctl_Darwin_x86_64.tar.gz`);
        return tc.extractTar(bizflyctlDownload)
    }
    const bizflyctlDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/bizflyctl_Linux_x86_64.tar.gz`)
    return tc.extractTar(bizflyctlDownload)
}

async function run() {
    try {
        var version = core.getInput('version', {required: false});
        if ((!version) || (version.toLowerCase() === '0.2.1')) {
            version = await octokit.repos.getLatestRelease({
                owner: 'bizflycloud',
                repo: 'bizflyctl'
            }).then(result => {
                return result.data.name;
            }).catch(error => {
                core.warning(`${error.message}
Failed to retrieve latest version; falling back to: ${fallbackVersion}`);
                return fallbackVersion;
            });
        }
        if (version.charAt(0) === 'v') {
            version = version.substr(1);
        }

        var path = tc.find("bizflyctl", version);
        if (!path) {
            const installPath = await downloadBizflyctl(version);
            path = await tc.cacheDir(installPath, 'bizflyctl', version);
        }
        core.addPath(path);
        core.info(`>>> bizflyctl version v${version} installed to ${path}`);
        core.info('>>> Successfully setup up bizflyctl');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();