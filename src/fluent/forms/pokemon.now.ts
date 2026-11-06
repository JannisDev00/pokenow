import { Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_2270446_pokenow_attributes',
    view: default_view,
    sections: [
        {
            caption: 'Pokemon',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ field: 'image_html', type: 'table_field' }],
                },
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'id', type: 'table_field' },
                        { field: 'height', type: 'table_field' },
                        { field: 'weight', type: 'table_field' },
                        { field: 'base_experience', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'order', type: 'table_field' },
                        { field: 'is_default', type: 'table_field' },
                        { field: 'location_area_encounters', type: 'table_field' },
                        { field: 'wins', type: 'table_field' },
                        { field: 'losses', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'recent_battles', type: 'table_field' },
                        { field: 'species', type: 'table_field' },
                        { field: 'sprites', type: 'table_field' },
                        { field: 'cries', type: 'table_field' },
                        { field: 'forms', type: 'table_field' },
                        { field: 'game_indices', type: 'table_field' },
                        { field: 'held_items', type: 'table_field' },
                        { field: 'moves', type: 'table_field' },
                        { field: 'past_abilities', type: 'table_field' },
                        { field: 'past_stats', type: 'table_field' },
                        { field: 'past_types', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})
