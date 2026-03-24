# System software

## File archiver

<Tabs v-model="tab">
  <TabPane name="7-zip" label="7-Zip" icon="/images/software/system/7-zip/favicon.ico">
    <p>designed for high-ratio compression, primarily used to manage and compress files into archives.</p>
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
