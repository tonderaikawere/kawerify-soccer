const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname);

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove lucide-react import statements
  content = content.replace(/import\s+{[^}]*}\s+from\s+"lucide-react";?\s*/g, '');
  // List of lucide icons to remove
  const icons = [
    'Trophy','Users','Calendar','Settings','FileText','Scale','AlertTriangle','Shield','Eye','Lock','Database','Mail','User','Target','TrendingUp','Award','Star','History','Camera','Video','Upload','Download','Medal','Crown','Info','PanelLeft','GripVertical','Check','ChevronDown','ChevronRight','ChevronLeft','ChevronUp','MoreHorizontal','Circle','Dot','Search','X','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Pause','Play','Clock','MapPin','Phone','Zap','ChevronUp','ChevronDown','ChevronLeft','ChevronRight','MoreHorizontal','ChevronUp','ChevronDown']
  ;
  icons.forEach(icon => {
    // Remove self-closing tags like <Trophy ... />
    const selfClosing = new RegExp(`<${icon}[^>/]*\/?>`, 'g');
    content = content.replace(selfClosing, '');
    // Remove paired tags like <Trophy>...</Trophy>
    const paired = new RegExp(`<${icon}[^>]*>.*?<\/${icon}>`, 'gs');
    content = content.replace(paired, '');
  });
  // Collapse multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip irrelevant directories
      if (['node_modules', '.git', '.githooks', 'public', 'dist', 'build'].includes(entry.name)) continue;
      walk(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walk(projectRoot);
console.log('All Lucide icons removed');
