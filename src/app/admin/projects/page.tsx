import ProjectsManager from '@/components/admin/ProjectsManager';

export default function AdminProjectsPage() {
  return (
    <ProjectsManager
      title='Web Projects'
      description='Shown in the homepage Featured Projects section.'
      folder='projects'
      showLinks
    />
  );
}
