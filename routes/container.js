const containerRoutes = require('express').Router();
const containerController = require('../controllers/container');

/**
 * @api {put} /addContainer Create container
 * @apiName Create new container
 *
 * @apiParam  {String} [containerName] Name of the container
 * @apiParam  {String} [containerDescription] Description of the container
 * @apiParam  {String} [parentId] Parent Id of the parent container
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.put('/addContainer', containerController.addContainer);

/**
 * @api {patch} /editContainer Edit container
 * @apiName Edit container
 *
 * @apiParam  {String} [containerName] Name of the Container to be Updated
 * @apiParam  {String} [containerDescription] Description of the Container to be Updated
 * @apiParam  {String} [containerId] Id of the container to update the above data
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.patch('/editContainer', containerController.editContainer);

/**
 * @api {delete} /deleteContainer Delete container
 * @apiName Delete container
 *
 * @apiParam  {String} [containerId] Id of the container to update the above data
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.delete('/deleteContainer', containerController.deleteContainer);

/**
 * @api {get} /getContainer Get container info.
 * @apiName Get container info
 *
 * @apiParam  {String} [containerId] Id of the container
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.get('/getContainer', containerController.getContainer);

/**
 * @api {get} /getRootContainers Get root containers info.
 * @apiName Get root containers info
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.get(
    '/getRootContainers',
    containerController.getRootContainers
);

/**
 * @api {get} /getAllContainers Get All containers list.
 * @apiName Get all container info
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.get('/getAllContainers', containerController.getAllContainers);

module.exports = containerRoutes;

/**
 * @api {get} /getSiblingContainers Get Sibling containers list.
 * @apiName Get all sibling containers list
 *
 * @apiSuccess (200) {Object} not yet fixed
 */
containerRoutes.get(
    '/getSiblingContainers',
    containerController.getSiblingContainers
);

module.exports = containerRoutes;
