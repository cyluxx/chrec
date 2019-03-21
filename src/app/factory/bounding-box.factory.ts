import { BoundingBox } from 'chrec-core/lib/model/bounding-box';
import { ModelFactory } from 'chrec-core/lib/factory/model.factory';

export class BoundingBoxFactory {

  private modelFactory: ModelFactory = new ModelFactory();

  public fromChannelContent(channelContent: any): BoundingBox {
    return new BoundingBox(channelContent.x, channelContent.y, channelContent.width, channelContent.height);
  }

  public fromStorageJson(parsedJson: any): BoundingBox {
    return this.modelFactory.boundingBoxFromChrecJson(parsedJson);
  }
}
