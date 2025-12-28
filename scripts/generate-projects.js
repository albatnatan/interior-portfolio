import fs from 'fs';
import path from 'path';

function generateProjectsConfig() {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  const outputFile = path.join(projectsDir, 'projects-config.json');

  if (!fs.existsSync(projectsDir)) {
    console.log('Projects directory not found, creating...');
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  const items = fs.readdirSync(projectsDir, { withFileTypes: true });
  const projects = [];

  for (const item of items) {
    if (item.isDirectory()) {
      const folderPath = path.join(projectsDir, item.name);
      const files = fs.readdirSync(folderPath);
      
      const images = files
        .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

      if (images.length > 0) {
        const coverImage = images.find(img => img.toLowerCase().includes('cover')) || images[0];
        
        projects.push({
          id: item.name,
          title: item.name.replace(/-/g, ' '),
          image: `projects/${item.name}/${coverImage}`,
          images: images.map(img => `projects/${item.name}/${img}`),
          year: '2024'
        });
      }
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify({ projects }, null, 2));
  console.log(`Generated config for ${projects.length} projects at ${outputFile}`);
}

generateProjectsConfig();
