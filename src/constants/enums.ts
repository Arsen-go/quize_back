import { registerEnumType } from '@nestjs/graphql';

enum GridMapDefinedAsEnum {
  PERSONA = 'PERSONA',
  SEGMENT = 'SEGMENT',
}

enum GridMapRelationshipStateEnum {
  AS_IS = 'AS_IS',
  TO_BE = 'TO_BE',
  TRANSITIONAL = 'TRANSITIONAL',
}

enum MapTypeEnum {
  CUSTOM = 'CUSTOM',
  GRID = 'GRID',
  PERSONA = 'PERSONA_SEGMENT',
  INVENTORY = 'INVENTORY',
}

enum InventoryMapEnum {
  CX_X_DEPARTMENT = 'CX_X_DEPARTMENT',
  CX_X_CHANNEL = 'CX_X_CHANNEL',
  CX_B2B_DEMAND_X_CHANNEL = 'CX_B2B_DEMAND_X_CHANNEL',
  CX_B2B_DEMAND_X_DEPARTMENT = 'CX_B2B_DEMAND_X_DEPARTMENT',
}

enum BoardTypeEnum {
  BOARD = 'BOARD',
  CANVAS = 'CANVAS',
}

enum SharingPolicyEnum {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  PRIVATE = 'PRIVATE',
}

enum BoardItemTypeEnum {
  GROUP = 'GROUP',
  NOTE = 'NOTE',
  TEXT = 'TEXT',
  LINK = 'LINK',
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  RECT = 'RECT',
  TRIANGLE = 'TRIANGLE',
  ELLIPSE = 'ELLIPSE',
  STAR = 'STAR',
  LINE = 'LINE',
  ICON = 'ICON',
  SMART = 'SMART',
  ROUNDRECT = 'ROUNDRECT',
  DRAW = 'DRAW',
}

enum BoardUpdateZIndexEnum {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  START = 'START',
  END = 'END',
}

enum BoardUserTypeEnum {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

enum PermissionEnum {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEW = 'VIEW',
  LIMITED = 'LIMITED',
  MEMBER = 'MEMBER',
  CREATOR = 'CREATOR',
}

enum BoardAuthTypeEnum {
  USER = 'USER',
  ANONYMOUS = 'ANONYMOUS',
}

enum LanguagesEnum {
  en = 'en',
  pt = 'pt',
  es = 'es',
}

enum LanguageTypeEnum {
  ORGANIZATION = 'ORGANIZATION',
  ACCOUNT = 'ACCOUNT',
}

enum WorkflowTypeEnum {
  DIAGNOSTIC_CX = 'DIAGNOSTIC_CX',
}

enum PermissionTypeEnum {
  SUITE = 'SUITE',
  PROJECT = 'PROJECT',
  WORKSPACE = 'WORKSPACE',
  BOARD = 'BOARD',
}

enum UserActionEnum {
  OWNER = 'OWNER',
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

enum IpointTypeEnum {
  STORY_ELEMENT = 'STORY_ELEMENT',
  INTERACTION_POINT = 'INTERACTION_POINT',
}

enum OwnershipTypeEnum {
  MINE = 'MINE',
  ALL = 'ALL',
}

registerEnumType(OwnershipTypeEnum, {
  name: 'OwnershipTypeEnum',
});

registerEnumType(IpointTypeEnum, {
  name: 'IpointTypeEnum',
});

registerEnumType(UserActionEnum, {
  name: 'UserActionEnum',
});

registerEnumType(PermissionTypeEnum, {
  name: 'PermissionTypeEnum',
});

registerEnumType(WorkflowTypeEnum, {
  name: 'WorkflowTypeEnum',
});

registerEnumType(LanguageTypeEnum, {
  name: 'LanguageTypeEnum',
});

registerEnumType(LanguagesEnum, {
  name: 'LanguagesEnum',
});

registerEnumType(BoardAuthTypeEnum, {
  name: 'BoardAuthTypeEnum',
});

registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});

registerEnumType(BoardUserTypeEnum, {
  name: 'BoardUserTypeEnum',
});

registerEnumType(BoardUpdateZIndexEnum, {
  name: 'BoardUpdateZIndexEnum',
});

registerEnumType(BoardItemTypeEnum, {
  name: 'BoardItemTypeEnum',
});

registerEnumType(BoardTypeEnum, {
  name: 'BoardTypeEnum',
});

registerEnumType(SharingPolicyEnum, {
  name: 'SharingPolicyEnum',
});

registerEnumType(InventoryMapEnum, {
  name: 'InventoryMapEnum',
});

registerEnumType(MapTypeEnum, {
  name: 'MapTypeEnum',
});

registerEnumType(GridMapRelationshipStateEnum, {
  name: 'GridMapRelationshipStateEnum',
});

registerEnumType(GridMapDefinedAsEnum, {
  name: 'GridMapDefinedAsEnum',
});

export {
  BoardAuthTypeEnum,
  BoardItemTypeEnum,
  BoardTypeEnum,
  BoardUpdateZIndexEnum,
  BoardUserTypeEnum,
  GridMapDefinedAsEnum,
  GridMapRelationshipStateEnum,
  InventoryMapEnum,
  IpointTypeEnum,
  LanguagesEnum,
  LanguageTypeEnum,
  MapTypeEnum,
  OwnershipTypeEnum,
  PermissionEnum,
  PermissionTypeEnum,
  SharingPolicyEnum,
  UserActionEnum,
  WorkflowTypeEnum,
};
