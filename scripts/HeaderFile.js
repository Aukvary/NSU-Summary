class Utils {
  GenerateStructure(dv, options = {}) {
    const currentFile = dv.current().file;
    const currentFolder = currentFile.path.split("/").slice(0, -1).join("/");
    const basePath = currentFolder || "";

    const folders = new Set();
    for (let file of dv.pages().file) {
      if (file.path.startsWith(basePath) && file.path !== basePath) {
        const pathParts = file.path.substring(basePath.length + 1).split("/");
        if (pathParts[0] && !pathParts[0].includes(".")) {
          folders.add(pathParts[0]);
        }
      }
    }

    const sortedFolders = Array.from(folders).sort();

    for (let folder of sortedFolders) {
      const folderPath = basePath ? `${basePath}/${folder}` : folder;

      const results = {};
      let hasAnyFiles = false;

      for (const [headerText, tagQuery] of Object.entries(options)) {
        const files = dv.pages(`"${folderPath}" and (${tagQuery})`)
          .sort(p => p.file.name, "asc");
        
        results[headerText] = files;
        
        if (files.length > 0) {
          hasAnyFiles = true;
        }
      }

      if (!hasAnyFiles) continue;

      dv.header(3, folder);

      for (const [headerText, files] of Object.entries(results)) {
        if (files.length > 0) {
          dv.paragraph(`**${headerText}:**`);
          dv.list(files.file.link);
        }
      }
    }
  }
}