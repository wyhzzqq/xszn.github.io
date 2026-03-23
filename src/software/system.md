# 系统软件

## 压缩软件

<Tabs v-model="tab">
  <TabPane name="7-zip" label="7-Zip" icon="/images/software/system/7-zip/favicon.ico">
    <p>以其高压缩比和对多种文件格式的支持而闻名。它拥有自己的 7z 格式，并能够解压包括 ZIP、RAR 和 TAR 在内的多种常见压缩格式。</p>
    <p>
      <Button href="https://7-zip.org/" />
      <Button href="https://github.com/ip7z/7zip" />
    </p>
    <Img src="/images/software/system/7-zip/screenshot.webp" />
  </TabPane>
</Tabs>

<script setup>
import { ref } from 'vue'
import { Tabs, TabPane } from '../../.vitepress/theme/components/index'

const tab = ref('7-zip')
</script>
