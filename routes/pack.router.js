import { Router } from 'express';
import { handleGetAllPacks } from '../controller/pack.controller';

const packRouter = Router();

packRouter.get('/', handleGetAllPacks);
// categoryRouter.post('/', [categoryCreationValidation, handleCreateCategory]);
// categoryRouter.get('/', handleGetAllCategories);
// categoryRouter.get('/:id', handleGetUniqueCategory);
// categoryRouter.get('/:id/questions', handleGetAllQuestionsByCategory);
// categoryRouter.delete('/:id', handleDeleteCategory);
// categoryRouter.put('/:id', [categoryUpdateValidation, handleUpdateCategory]);

export default packRouter;
