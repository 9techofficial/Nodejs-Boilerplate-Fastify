import { FastifyRequest, FastifyReply } from 'fastify';
import { apiLog, logInfo } from '../utilities/logger';

export default class BaseController {
  protected model: any;
  protected services: any;

  constructor(model: any, services: any) {
    this.model = model;
    this.services = services;
  }

  // Find all records
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    apiLog.info('Fetching all records from path: ' + request.url);
    try {
      // Destructure query parameters
      type Tquery = { sort?: string; page?: number; limit?: number; filters: string };
      let { sort, page = 1, limit = 25, filters } = request.query as Tquery;

      // Manage limit
      limit = limit > 100 ? 100 : limit;

      // Parse sort and filters if they exist
      let filterObj: any = {};
      if (filters) {
        try {
          const parsedFilters = JSON.parse(filters); // Parse the filters string
          parsedFilters.forEach((filter: { field: string; value: string | boolean | number }) => {
            filterObj[filter.field] = filter.value;
          });
        } catch (err) {
          logInfo.error('Invalid filter format: ' + filters);
        }
      }

      let sortObj: any = {};
      if (sort) {
        try {
          const parsedSort = JSON.parse(sort); // Parse the sort string
          parsedSort.forEach(([field, order]: [string, number]) => {
            sortObj[field] = order;
          });
        } catch (err) {
          logInfo.error('Invalid sort format: ' + sort);
        }
      }

      // calculate pagination values
      const skip = (page - 1) * limit;
      const total = await this.services.count(filterObj);
      const pages = Math.ceil(total / limit);

      // check if page is out of range      
      if (total > 0 && page > pages) return reply.status(404).send({ error: 'Page not found' });

      // return paginated records
      const data = await this.services.findAll(filterObj, sortObj, skip, limit);
      reply.send({ data, pagination: { total, page, pages, limit } });
    } catch (err) {
      apiLog.error('Failed to fetch records from path: ' + request.url + ' Error: ' + JSON.stringify(err));
      reply.status(500).send({ error: 'Failed to fetch records' });
    }
  }

  // Find one record by ID
  async findOne(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    apiLog.info('Fetching record by ID: ' + id + ' from path: ' + request.url);
    try {
      const data = await this.services.findById(id);
      if (data) {
        reply.send({ data });
      } else {
        reply.status(404).send({ error: 'Record not found' });
      }
    } catch (err) {
      apiLog.error('Failed to fetch record by ID: ' + id + ' from path: ' + request.url + ' Error: ' + JSON.stringify(err));
      reply.status(500).send({ error: 'Failed to fetch record' });
    }
  }

  // Create a new record
  async create(request: FastifyRequest, reply: FastifyReply) {
    apiLog.info('Creating a new record from path: ' + request.url);
    try {
      const newRecord = await this.services.create(request.body);
      reply.status(201).send({ data: newRecord });
    } catch (err) {
      apiLog.error('Failed to create a new record from path: ' + request.url + ' Error: ' + JSON.stringify(err));
      reply.status(500).send({ error: 'Failed to create record' });
    }
  }

  // Update a record by ID
  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    apiLog.info('Updating record by ID: ' + id + ' from path: ' + request.url);
    try {
      const updatedRecord = await this.services.update(id, request.body);
      if (updatedRecord) {
        reply.send({ data: updatedRecord });
      } else {
        reply.status(404).send({ error: 'Record not found' });
      }
    } catch (err) {
      apiLog.error('Failed to update record by ID: ' + id + ' from path: ' + request.url + ' Error: ' + JSON.stringify(err));
      reply.status(500).send({ error: 'Failed to update record' });
    }
  }

  // Delete a record by ID
  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    apiLog.info('Deleting record by ID: ' + id + ' from path: ' + request.url);
    try {
      const deletedRecord = await this.services.delete(id);
      if (deletedRecord) {
        reply.send({ message: 'Record deleted successfully' });
      } else {
        reply.status(404).send({ error: 'Record not found' });
      }
    } catch (err) {
      apiLog.error('Failed to delete record by ID: ' + id + ' from path: ' + request.url + ' Error: ' + JSON.stringify(err));
      reply.status(500).send({ error: 'Failed to delete record' });
    }
  }
}
