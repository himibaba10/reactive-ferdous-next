import ProjectsManager from '@/components/admin/ProjectsManager';

export default function AdminGraphicPage() {
  return (
    <ProjectsManager
      fixedCategory='Graphic Design'
      title='Graphic Portfolio'
      description='Shown on the Graphic Design service page.'
      folder='graphic'
      showLinks={false}
    />
  );
}
