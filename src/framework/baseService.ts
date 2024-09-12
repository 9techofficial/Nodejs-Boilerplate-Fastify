import { logInfo } from '../utilities/logger';

export default class BaseService {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  // Find all records
  async findAll(filterObj = {}, sortObj = {}, skip = 0, limit = 0) {
    try {
      return await this.model.find(filterObj).sort(sortObj).skip(skip).limit(limit);
    } catch (err) {
      logInfo.error('Failed to fetch records Error: ' + JSON.stringify(err));
      throw err;
    }
  }

  // Find one record by ID  
  async findOne(id: string) {
    try {
      return await this.model.findById(id);      
    } catch (err) {
      logInfo.error('Failed to fetch record by ID: ' + id + ' Error: ' + JSON.stringify(err));
      throw err;
    }
  }

  // Find the count of records
  async count(filterObj ={}){
    try {
      return await this.model.find(filterObj).countDocuments();
    } catch (err) {
      logInfo.error('Failed to count records Error: ' + JSON.stringify(err));
      throw err;
    }
  }

  // Create a new record
  async create(data: any) {
    try {
      return await this.model.create(data);
    } catch (err) {
      logInfo.error('Failed to create a new record Error: ' + JSON.stringify(err));
      throw err;
    }
  }

  // Update a record by ID
  async update(id: string, data: any) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
      logInfo.error('Failed to update record by ID: ' + id + ' Error: ' + JSON.stringify(err));
      throw err;
    }
  }

  // Delete a record by ID
  async delete(id: string) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (err) {
      logInfo.error('Failed to delete record by ID: ' + id + ' Error: ' + JSON.stringify(err));
      throw err;
    }
  }
}
